namespace HotelsApp.Models.QueryModels
{
    using HotelsApp.Models.ViewModels;
    using System.Collections.Generic;
    using System.Text.Json.Serialization;

    public class ApiItemsQueryModel
    {
        [JsonPropertyName("items")]
        public List<PropertyQueryModel> Items { get; set; }
    }
}