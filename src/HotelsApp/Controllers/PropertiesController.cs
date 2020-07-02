namespace HotelsApp.Controllers
{
    using HotelsApp.Models.InputModels;
    using HotelsApp.Services.Contracts;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Threading.Tasks;

    [Route("api/[controller]/")]
    [ApiController]
    public class PropertiesController : Controller
    {
        private readonly IPropertiesService propertiesService;

        public PropertiesController(IPropertiesService propertiesService)
        {
            this.propertiesService = propertiesService;
        }

        [HttpPost("FindProperties")]
        public async Task<IActionResult> FindProperties(LocationInputModel inputModel)
        {
            try
            {
                var result = await propertiesService.GetProperties(inputModel.Latitude, inputModel.Longtitude);
                return this.Json(result);
            }
            catch (Exception exception)
            {
                return this.NotFound();
            }
        }

        [HttpPost("AddBookingToProperty")]
        public async Task<IActionResult> AddBookingToProperty(AddBookingInputModel inputModel)
        {
            try
            {
                var result = await propertiesService.AddBookingToProperty(inputModel.HotelId);
                return this.Json(result);
            }
            catch (Exception exception)
            {
                return this.NotFound();
            }
        }
    }
}
