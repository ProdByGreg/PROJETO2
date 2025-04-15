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

    [HttpGet("{id}")]
public async Task<IActionResult> GetPreferenciasByUserId(int id)
{
    var preferencia = await _context.PreferenciasUsuario.FirstOrDefaultAsync(p => p.UserId == id);
    if (preferencia == null)
    {
        return NotFound();
    }

    return Ok(preferencia);
}


}
