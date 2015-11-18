// Copyright [2015] [Centers for Disease Control and Prevention] 
// Licensed under the CDC Custom Open Source License 1 (the 'License'); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at
// 
//   http://t.cdc.gov/O4O
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Copyright [2015] [Centers for Disease Control and Prevention] 
// Licensed under the CDC Custom Open Source License 1 (the 'License'); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at
// 
//   http://t.cdc.gov/O4O
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Copyright [2015] [Centers for Disease Control and Prevention] 
// Licensed under the CDC Custom Open Source License 1 (the 'License'); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at
// 
//   http://t.cdc.gov/O4O
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

using System;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Configuration;
using System.Collections.Specialized;
using Gov.Hhs.Cdc.Commons.Api.Key.Utils;


namespace Storefront
{
    [ScriptService]
    public class secureProxy : WebService
    {
        private static WebHeaderCollection SecureHeader
        {
            get { return (WebHeaderCollection)HttpContext.Current.Session["SecureHeader"]; }
            set { HttpContext.Current.Session["SecureHeader"] = value; }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public string request(string url, string data, string httpMethod)
        {
            //Used for SSL
            ServicePointManager.ServerCertificateValidationCallback += new RemoteCertificateValidationCallback(ValidateServerCertificate);

            WebClient webClient = new WebClient();
            webClient.Headers.Add("Authorization", GetAuthorizationHeader(ref webClient, url, httpMethod, data));

            string response = webClient.UploadString(url, httpMethod, data);
            SecureHeader = webClient.ResponseHeaders;

            webClient.Dispose();
            return response;
        }

        //for testing purpose only, accept any dodgy certificate... 
        public static bool ValidateServerCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }

        private string GetAuthorizationHeader(ref WebClient request, string url, string method, string requestBody)
        {
            AuthorizationHeaderGenerator.KeyAgreement keyAgreement = new AuthorizationHeaderGenerator.KeyAgreement();
            keyAgreement.publicKey = ConfigurationManager.AppSettings["API_PublicKey"];
            keyAgreement.secret = ConfigurationManager.AppSettings["API_Secret"];

            AuthorizationHeaderGenerator generator = new AuthorizationHeaderGenerator("syndication_api_key", keyAgreement);

            var headers = new NameValueCollection();
            headers.Add("X-Syndication-Date", DateTime.UtcNow.ToString());
            headers.Add("Content-Type", "application/json");

            // Add headers to request
            request.Headers.Add(headers);

            headers.Add("Content-Length", requestBody.Length.ToString());
            string apiKeyHeaderValue = generator.GetApiKeyHeaderValue(headers, url, method, requestBody);

            return apiKeyHeaderValue;
        }
    }
}
