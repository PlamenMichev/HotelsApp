using HotelsApp.Data;
using HotelsApp.Data.Models;
using HotelsApp.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace HotelsApp.Tests
{
    public class PropertiesServiceTests
    {
        [Theory]
        [InlineData(40, 10)]
        [InlineData(31, 20)]
        [InlineData(100, 100)]
        public async Task GetPropertiesShouldThrow(double lat, double lng)
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
            var db = new ApplicationDbContext(options);

            var service = new PropertiesService(db);

            await Assert.ThrowsAnyAsync<Exception>(async () => await service.GetProperties(lat, lng));
        }

        [Theory]
        [InlineData(41.88691326431521, 23.10634746347656)]
        [InlineData(42.016108978551806, 23.092174490080122)]
        [InlineData(47.761330089066725, 14.184482417828232)]
        public async Task GetPropertiesShouldReturn4Hotels(double lat, double lng)
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
            var db = new ApplicationDbContext(options);

            var service = new PropertiesService(db);

            var result = await service.GetProperties(lat, lng);
            Assert.Equal(4, result.Length);
        }

        [Theory]
        [InlineData(41.88691326431521, 23.10634746347656)]
        [InlineData(42.016108978551806, 23.092174490080122)]
        [InlineData(47.761330089066725, 14.184482417828232)]
        public async Task GetPropertiesShouldReturnValidHotels(double lat, double lng)
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
            var db = new ApplicationDbContext(options);

            var service = new PropertiesService(db);

            var result = await service.GetProperties(lat, lng);
            foreach (var hotel in result)
            {
                Assert.NotNull(hotel.Name);
            }
        }

        [Fact]
        public async Task AddBookingToPropertyShouldWorkCorrectly()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
            var db = new ApplicationDbContext(options);
            var hotel = await db.Hotels.AddAsync( new Hotel { HotelId = "123", BookingsCount = 0 });
            await db.SaveChangesAsync();

            var service = new PropertiesService(db);

            var result = await service.AddBookingToProperty(hotel.Entity.HotelId);
            Assert.Equal(1, result);
        }

        [Fact]
        public async Task AddBookingToPropertyShouldThrow()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
            var db = new ApplicationDbContext(options);
            var hotel = await db.Hotels.AddAsync(new Hotel { HotelId = "123", BookingsCount = 0 });
            await db.SaveChangesAsync();

            var service = new PropertiesService(db);

            var result = await service.AddBookingToProperty(hotel.Entity.HotelId);
            await Assert.ThrowsAnyAsync<Exception>(async () => await service.AddBookingToProperty("random id"));
        }
    }
}
