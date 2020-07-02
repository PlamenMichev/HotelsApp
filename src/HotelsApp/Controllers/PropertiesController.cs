namespace HotelsApp.Controllers
{
    using HotelsApp.Models.InputModels;
    using HotelsApp.Services.Contracts;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    public class PropertiesController : Controller
    {
        private readonly IPropertiesService propertiesService;

        public PropertiesController(IPropertiesService propertiesService)
        {
            this.propertiesService = propertiesService;
        }

        [HttpPost]
        public async Task<IActionResult> FindProperty(LocationInputModel inputModel)
        {
            try
            {
                var result = await propertiesService.GetProperties(inputModel.Latitute, inputModel.Longtitute);
                return this.View(result);
            }
            catch (System.Exception)
            {
                return this.Redirect("/");
            }
        }
    }
}
