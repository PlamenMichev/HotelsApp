namespace HotelsApp.Models.ViewModels
{
    using System.Text.Json.Serialization;

    public class PropertyViewModel
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }
    }
}
