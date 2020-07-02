namespace HotelsApp.Models.ViewModels
{
    public class PropertyLocationViewModel
    {
        public AddressViewModel Address { get; set; }

        public decimal[] Position { get; set; }
    }
}