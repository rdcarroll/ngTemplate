// --------------------------------------------------------------------------------------------------------------------
// <copyright file="BundleConfig.cs" company="">
//   Copyright © 2015 
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.ngApp
{
    using System.Web;
    using System.Web.Optimization;

    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/css/app").Include("~/Client/vendor/app.css"));

            bundles.Add(new ScriptBundle("~/js/angular").Include("~/Client/vendor/angular/angular-ui-router.js"));
            bundles.Add(new ScriptBundle("~/js/jquery").Include("~/Client/vendor/jquery/jquery-{version}.js"));

        }
    }
}
