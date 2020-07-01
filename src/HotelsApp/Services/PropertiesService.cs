namespace HotelsApp.Services
{
    using HotelsApp.Models.ViewModels;
    using HotelsApp.Services.Contracts;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Text.Json;
    using System.Text.Json.Serialization;
    using System.Threading.Tasks;

    public class PropertiesService : IPropertiesService
    {
        private readonly HttpClient httpClient;

        public PropertiesService()
        {
            this.httpClient = HttpClientFactory.Create();
        }

        public async Task<PropertyViewModel[]> GetProperties(double latitude, double longtitude)
        {
            string url = $"https://discover.search.hereapi.com/v1/discover?at={latitude},{longtitude}&q=hotel&limit=5&apiKey=nEszsNd4L0Iut8_Xus2aQ6pcih4OCxCKQjGNQK_gxFg";
            var response =  await httpClient.GetAsync(url);
            var resultAsString = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<ModelMain>(resultAsString);

            var result2 = await httpClient.GetAsync("https://lookup.search.hereapi.com/v1/lookup?id=here:pds:place:276u0vhj-b0bace6448ae4b0fbc1d5e323998a7d2&apiKey=nEszsNd4L0Iut8_Xus2aQ6pcih4OCxCKQjGNQK_gxFg");
            var resultAsString2 = await result2.Content.ReadAsStringAsync();
            return result.Items.ToArray();
        }
    }

    public class ModelMain
    {
        [JsonPropertyName("items")]
        public List<PropertyViewModel> Items { get; set; }
    }
}
