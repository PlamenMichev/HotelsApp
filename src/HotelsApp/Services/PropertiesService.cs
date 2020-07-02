namespace HotelsApp.Services
{
    using HotelsApp.Models.QueryModels;
    using HotelsApp.Models.ViewModels;
    using HotelsApp.Services.Contracts;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Text.Json.Serialization;
    using System.Threading.Tasks;

    public class PropertiesService : IPropertiesService
    {
        private readonly HttpClient httpClient;
        private const string defaultHotelPicture = "https://freedesignfile.com/upload/2019/07/Hotel-cartoon-vector.jpg";

        public PropertiesService()
        {
            this.httpClient = HttpClientFactory.Create();
        }

        public async Task<PropertyViewModel[]> GetProperties(double latitude, double longtitude)
        {
            string url = $"https://places.sit.ls.hereapi.com/places/v1/discover/explore?at={latitude}%2C{longtitude}&cat=hotel&&app_id=Q3fk87P2N4cpAe1iD1GP&app_code=oZI45mGxl_rZMAQxulMNrw";
            var response =  await httpClient.GetAsync(url);
            var resultAsString = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<ApiResultQueryModel>(resultAsString);

            var foundHotels = result.Results.Items
                .Take(5)
                .ToList();

            if (foundHotels.Count == 0)
            {
                throw new Exception("No hotels were found on this location!");
            }

            var hotelsResult = new List<PropertyViewModel>();

            foreach (var hotel in foundHotels)
            {
                var getHotelInfo = await this.httpClient.GetAsync(hotel.Href);
                var infoAsString = await getHotelInfo.Content.ReadAsStringAsync();
                var hotelInfo = JsonConvert.DeserializeObject<PropertyViewModel>(infoAsString);

                if (hotelInfo.Media.Images?.Items.Count == 0)
                {
                    hotelInfo.Media.Images.Items.Add(new ImagesHotelViewModel
                    {
                        Value = defaultHotelPicture,
                    });
                }
                hotelsResult.Add(hotelInfo);
            }

            return hotelsResult.ToArray();
        }
    }
}
