namespace HotelsApp.Services.Contracts
{
    using HotelsApp.Models.ViewModels;
    using System.Threading.Tasks;

    public interface IPropertiesService
    {
        public Task<PropertyViewModel[]> GetProperties(double latitude, double longtitude);
    }
}
