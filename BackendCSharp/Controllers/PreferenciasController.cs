using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BackendCSharp.Controllers;
using BackendCSharp.Models;

[Route("api/[controller]")]
[ApiController]
public class PreferenciasController : ControllerBase
{
    private readonly AppDbContext _context;

    public PreferenciasController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> SalvarPreferencias([FromBody] PreferenciasUsuario preferencias)
    {
        if (preferencias == null)
        {
            return BadRequest("Dados inválidos.");
        }

        var usuarioExistente = await _context.Users.FindAsync(preferencias.UserId);
        if (usuarioExistente == null)
        {
            return NotFound("Usuário não encontrado.");
        }

        _context.PreferenciasUsuarios.Add(preferencias);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(SalvarPreferencias), new { id = preferencias.Id }, preferencias);
    }
}
