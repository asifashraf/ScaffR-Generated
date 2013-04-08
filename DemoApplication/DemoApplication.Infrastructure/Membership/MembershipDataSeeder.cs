#region credits
// ***********************************************************************
// Assembly	: DemoApplication.Infrastructure
// Author	: Rod Johnson
// Created	: 03-19-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************
#endregion
namespace DemoApplication.Infrastructure.Membership
{
    #region

    using System;
    using System.Data.Entity.Migrations;
    using System.Security.Claims;
    using Core.Model;
    using Data;

    #endregion

    public partial class MembershipDataSeeder
    {
        public void Seed(DataContext context)
        {
            var user = new User()
                {
                    Id = 1,
                    Email = "asif.log@gmail.com",
                    Username = "radasif",
                    FirstName = "Asif",
                    LastName = "Ashraf",
                    LastLogin = DateTime.UtcNow,
                    Gender = Gender.Male,
                    Address = "22-T DHA, Lahore",
                    PhoneNumber = "336-311-1303",
                    IsLoginAllowed = true,
                    IsAccountClosed = false,
                    IsAccountVerified = true,
                    Created = DateTime.UtcNow,
                    Tenant = "default",
                    // password is "admin"
                    HashedPassword = "FA00.ACHEhktjwC+lLMLKq0PZXYsnr9HreWXtgMY55xMDY4ctWYeyzGPxt2vGLEtOEX2SKA==",
                    PasswordChanged = DateTime.UtcNow,
                    FailedLoginCount = 0,
                    Updated = DateTime.UtcNow
                };

            user.Claims.Add(new UserClaim()
                {
                    Type = ClaimTypes.Role,
                    Value = "Admin"
                });

            user.Claims.Add(new UserClaim()
            {
                Type = ClaimTypes.Role,
                Value = "Super Admin"
            });

            context.Users.AddOrUpdate(user);
            context.SaveChanges();
        }
    }
}