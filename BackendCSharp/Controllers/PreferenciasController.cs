using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BackendCSharp.Models;

[ApiController]
[Route("api/[controller]")]
public class PreferenciasController : ControllerBase
{
    private readonly AppDbContext _context;

    public PreferenciasController(AppDbContext context)
    {
        _context = context;
    }





    [HttpPost]
    public async Task<IActionResult> SalvarPreferencia([FromBody] PreferenciasUsuario preferencia)
    {
        if (preferencia == null || preferencia.UserId == 0)
        {
            return BadRequest(new { message = "Dados inválidos" });
        }

        _context.PreferenciasUsuario.Add(preferencia);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Preferência salva com sucesso" });
    }









[HttpGet("perfil/{userId}")]
public async Task<IActionResult> GetPerfilCompleto(int userId)
{
    var usuario = await _context.Users.FindAsync(userId);
    var preferencias = await _context.PreferenciasUsuario.FirstOrDefaultAsync(p => p.UserId == userId);

    if (usuario == null)
    {
        return NotFound(new { message = "Usuário não encontrado." });
    }

    return Ok(new
    {
        usuario.Id,
        usuario.Nome,
        usuario.Email,
        usuario.Telefone,
        usuario.CPF,
        Preferencias = preferencias
    });
}










[HttpGet("{userId}")]
public async Task<IActionResult> GetPreferenciasPorUsuario(int userId)
{
    var preferencia = await _context.PreferenciasUsuario
        .FirstOrDefaultAsync(p => p.UserId == userId);

    if (preferencia == null)
    {
        return NotFound(new { message = "Preferências não encontradas para o usuário." });
    }

    return Ok(preferencia);
}

}