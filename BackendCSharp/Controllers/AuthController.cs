using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendCSharp.Models;
using BackendCSharp.Controllers;




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







        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {

            if (string.IsNullOrEmpty(request.Nome) ||string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password) ||
                string.IsNullOrEmpty(request.Telefone) || string.IsNullOrEmpty(request.CPF))
            {
                return BadRequest(new { message = "Todos os campos são obrigatórios" });
            }


            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest(new { message = "E-mail já cadastrado" });
            }


            if (await _context.Users.AnyAsync(u => u.CPF == request.CPF))
            {
                return BadRequest(new { message = "CPF já cadastrado" });
            }


            var user = new User
            {
                Nome = request.Nome,
                Email = request.Email,
                Password = request.Password,
                Role = "user",
                Telefone = request.Telefone,
                CPF = request.CPF
            };


            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return StatusCode(201, new { message = "Conta criada com sucesso" });
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

            return Ok(new
            {
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    nome = user.Nome
                },
                role = user.Role
            });
        }



    }



}