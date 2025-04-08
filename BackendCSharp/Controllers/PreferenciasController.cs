using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BackendCSharp.Controllers;
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
public async Task<IActionResult> salvarPreferencias([FromBody] PreferenciasUsuario preferencias)
{
    if (preferencias == null)
    {
        return BadRequest("Preferências não fornecidas.");
    }

    try
    {
        _context.preferenciasusuario.Add(preferencias);
        await _context.SaveChangesAsync();
        return Ok();
    }
    catch (DbUpdateException ex)
    {
        return StatusCode(500, $"Erro ao salvar preferências: {ex.Message}");
    }
}
}


