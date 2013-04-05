#region credits
// ***********************************************************************
// Assembly	: DemoApplication
// Author	: Rod Johnson
// Created	: 02-24-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************
#endregion
namespace DemoApplication.Controllers.Account
{
    #region

    using System.Web;
    using System.Web.Mvc;
    using Core.Common.Photos;
    using Infrastructure.Photos;
    using Infrastructure.Profiles;

    #endregion

    /// <summary>
    /// Class AccountController
    /// </summary>
    public partial class AccountController
    {
        /// <summary>
        /// Update the profile photo.
        /// </summary>
        /// <returns>ActionResult.</returns>
        [HttpGet]
        public ActionResult Photo()
        {
            if (!string.IsNullOrWhiteSpace(UserProfile.Current.PhotoId))
            {
                var photo = PhotoManager.Provider.GetPhotoResize(UserProfile.Current.PhotoId, "Medium");
                return View(photo);
            }

            return View(new Photo { Url = Url.Content("~/Content/images/Medium/Male.jpg") });
        }

        /// <summary>
        /// Update the profile photo.
        /// </summary>
        /// <param name="file">The file.</param>
        /// <returns>ActionResult.</returns>
        [HttpPost]
        public ActionResult Photo(HttpPostedFileBase file)
        {
            var request = new PhotoRequest(file.InputStream, "image/png", null);

            var photo = PhotoManager.Provider.SavePhotoForAllSizes(request, true);

            _userService.SetProfilePicture(UserProfile.Current.Tenant, UserProfile.Current.Username, photo[0].Id);

            return View();
            
        }
    }
}