using Microsoft.AspNetCore.Mvc;
using BackendCSharp.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendCSharp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "E-mail e senha são obrigatórios" });
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Credenciais inválidas" });
            }

            return Ok(new { role = user.Role });
        }
    }
}