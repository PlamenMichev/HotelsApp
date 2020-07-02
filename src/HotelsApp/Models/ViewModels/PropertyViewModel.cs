namespace HotelsApp.Models.ViewModels
{
    using System.Text.Json.Serialization;

    public class PropertyViewModel
    {
        public string PlaceId { get; set; }

        public string Name { get; set; }

        public PropertyLocationViewModel Location { get; set; }

        public ContactsViewModel Contacts { get; set; }

        public MediaViewModel Media { get; set; }

        public WorkingHoursViewModel Extended { get; set; }
    }
}
