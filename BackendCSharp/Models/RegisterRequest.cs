namespace BackendCSharp.Controllers
{
    public class RegisterRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
    }
}