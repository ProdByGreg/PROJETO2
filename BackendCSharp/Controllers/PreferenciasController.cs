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
    public async Task<IActionResult> SalvarPreferencia([FromBody] Preferencia preferencia)
    {
        if (preferencia == null || preferencia.UserId == 0)
        {
            return BadRequest(new { message = "Dados inválidos" });
        }

        _context.PreferenciasUsuarios.Add(preferencia);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Preferência salva com sucesso" });
    }

}
