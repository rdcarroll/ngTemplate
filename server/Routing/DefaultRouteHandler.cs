// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DefaultRouteHandler.cs" company="">
//   Copyright © 2015 
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.ngApp.Routing
{
    using System;
    using System.Web;
    using System.Web.Routing;
    using System.Web.WebPages;

    public class DefaultRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {

            var filePath = requestContext.HttpContext.Request.AppRelativeCurrentExecutionFilePath;

            filePath = "~/client/src/index.cshtml";
            var handler = WebPageHttpHandler.CreateFromVirtualPath(filePath); // returns NULL if .cshtml file wasn't found

            if (handler == null)
            {
                handler = WebPageHttpHandler.CreateFromVirtualPath("~/client/src/404.cshtml");
            }

            return handler;
        }
    }
}
