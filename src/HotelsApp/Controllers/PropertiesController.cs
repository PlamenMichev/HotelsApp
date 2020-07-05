namespace HotelsApp.Controllers
{
    using HotelsApp.Models.InputModels;
    using HotelsApp.Services.Contracts;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class PropertiesController : Controller
    {
        private readonly IPropertiesService propertiesService;

        public PropertiesController(IPropertiesService propertiesService)
        {
            this.propertiesService = propertiesService;
        }

        [HttpGet]
        public async Task<IActionResult> FindProperties([FromQuery]LocationInputModel inputModel)
        {
            try
            {
                var latitude = double.Parse(inputModel.At.Split(",")[0]);
                var longtitude = double.Parse(inputModel.At.Split(",")[1]);
                var result = await propertiesService.GetProperties(latitude, longtitude);
                return this.Json(result);
            }
            catch (Exception)
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
            catch (Exception)
            {
                return this.NotFound();
            }
        }
    }
}
