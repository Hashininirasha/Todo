namespace asp.net_backend.Controllers.Models
{
    public class List
    {
        public int Id { get; set; }
        public string? Title { get; set; }

        public string? Description { get; set; }

        public Boolean IsActive { get; set; }
    }
}
