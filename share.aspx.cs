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
using System.Configuration;
using System.Net;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;

namespace Storefront
{
    public partial class share : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string mediaId = Request.QueryString["mediaid"];

            if (string.IsNullOrEmpty(mediaId))
            {
                mediaId = Request.QueryString["mediaid"];
            }

            // temp fix: check if id is applied (at least we don't get an exception)
            if (string.IsNullOrWhiteSpace(mediaId)) return;

            string apiRoot = ConfigurationManager.AppSettings["APIRoot"];
            string webRoot = ConfigurationManager.AppSettings["WebRoot"];

            JavaScriptSerializer JSS = new JavaScriptSerializer();
            string mediaData = getMediaData(apiRoot, mediaId);
            dynamic data = JSS.Deserialize<dynamic>(mediaData)["results"];

            string mediaType = data["mediaType"];
            string content = data["content"];
            string description = data["description"];
            string targetUrl = data["targetUrl"];
            string sourceUrl = data["sourceUrl"];
            string name = data["name"];

            // setup thumbnail root
            string thumbUrl = apiRoot + "/api/v2/resources/media/" + mediaId + "/thumbnail?"
                        + "apiroot=" + Server.HtmlEncode(apiRoot)                        
                        + "&webroot=" + Server.HtmlEncode(FullyQualifiedApplicationPath);

            // complete thumbnail string and get content block;
            switch (mediaType.ToUpper()) {
                case "HTML":
                    thumbUrl += "&w=200&h=200&bw=700&bh=700&pause=250";
                    description = StripTagsCharArray(content);
                    break;

                case "ECARD":
                    thumbUrl += "&w=200&h=200&bw=580&bh=580&cx=50&cy=76&cw=472&ch=260&pause=2000";
                    content += "<div class=\"CDCeCard_00\"></div><script> $('.CDCeCard_00').ecardPlugin({";
                    content += "mediaId: " + mediaId.ToString() + ",";
                    content += "apiRoot: '" + apiRoot + "', filePath: '" + webRoot + "/mediaAssets/ecards/cards/', returnNavigation: {text: 'Choose another eCard', navigateUrl: '' }, completeNavigation: {text: 'Choose another eCard', navigateUrl: '' } });</script>";
                    break;

                case "VIDEO":
                    thumbUrl += "&w=200&h=200&bw=320&bh=185&pause=2000";
                    targetUrl = targetUrl.Replace("http://www.youtube.com/embed/", "http://youtube.googleapis.com/v/");
                    targetUrl = targetUrl.Replace("http://www.youtube.com/watch?v=", "http://youtube.googleapis.com/v/");
                    content += "<iframe width=\"420\" height=\"315\" src='" + targetUrl + "' frameborder=\"0\" allowfullscreen></iframe>";
                    break;

                case "IMAGE":
                    thumbUrl += "&w=200&h=200&bw=800&bh=800&pause=3000";
                    content += "<img src='" + sourceUrl + "'>";
                    break;

                case "BUTTON":
                    thumbUrl += "&w=200&h=200&bw=250&bh=250&pause=1000";
                    break;

                case "BADGE":
                    thumbUrl += "&w=200&h=200&bw=180&bh=150&pause=1000";
                    break;

                case "INFOGRAPHIC":
                    thumbUrl += "&w=200&h=200&bw=1200&bh=1200&pause=1000";
                    //content += "<img src='" + data["sourceUrl"] + "'>";
                    break;

                case "WIDGET":
                    thumbUrl += "&w=200&h=200&bw=622&bh=472&pause=1000";
                    break;
            }

            var metaUrl = "<meta property=\"og:url\" content=\"" + HttpContext.Current.Request.Url.AbsoluteUri + "\" />";
            var metaTitle = "<meta property=\"og:title\" content=\"" + name + "\" />";
            var metaDescription = "<meta property=\"og:description\" content=\"" + ( description.Length > 1000 ? description.Substring(0, 1000) : description ) + "\" />";
            var metaImage = "<meta property=\"og:image\" content=\"" + thumbUrl + "\" />";

            metaLiteral.Text = metaUrl + metaTitle + metaDescription + metaImage;

            Page.Title = name;
            lit.Text = content;

            hlBackLink.NavigateUrl = FullyQualifiedApplicationPath + "index.htm?mediaid=" + mediaId;
            hlBackLink.Text = FullyQualifiedApplicationPath;
        }

        private string getMediaData(string apiRoot, string id)
        {
            string url = apiRoot + "/api/v2/resources/media/" + id + "/syndicate/?";

            WebClient webClient = new WebClient();
            string response = webClient.DownloadString(url);

            return response;
        }

        private string StripTagsCharArray(string source)
        {
            char[] array = new char[source.Length];
            int arrayIndex = 0;
            bool inside = false;

            for (int i = 0; i < source.Length; i++)
            {
                char let = source[i];
                if (let == '<')
                {
                    inside = true;
                    continue;
                }
                if (let == '>')
                {
                    inside = false;
                    continue;
                }
                if (!inside)
                {
                    array[arrayIndex] = let;
                    arrayIndex++;
                }
            }
            return new string(array, 0, arrayIndex);
        }

        private string FullyQualifiedApplicationPath
        {
            get
            {
                //Return variable declaration
                var appPath = string.Empty;

                //Getting the current context of HTTP request
                var context = HttpContext.Current;

                //Checking the current context content
                if (context != null)
                {
                    //Formatting the fully qualified website url/name
                    appPath = string.Format("{0}://{1}{2}{3}",
                                            context.Request.Url.Scheme,
                                            context.Request.Url.Host,
                                            context.Request.Url.Port == 80
                                                ? string.Empty
                                                : ":" + context.Request.Url.Port,
                                            context.Request.ApplicationPath);
                }

                if (!appPath.EndsWith("/"))
                    appPath += "/";

                return appPath;
            }
        }
    }
}
