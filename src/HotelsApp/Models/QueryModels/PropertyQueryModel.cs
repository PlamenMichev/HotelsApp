using System.Text.Json.Serialization;

namespace HotelsApp.Models.QueryModels
{
    public class PropertyQueryModel
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("href")]
        public string Href { get; set; }

        [JsonPropertyName("openingHourstext")]
        public string OpeningHoursText { get; set; }
    }
}
