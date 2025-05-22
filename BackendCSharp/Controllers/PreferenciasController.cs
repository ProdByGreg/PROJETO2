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
public async Task<IActionResult> SalvarOuAtualizarPreferencia([FromBody] PreferenciasUsuario preferencia)
{
    if (preferencia == null || preferencia.UserId == 0)
    {
        return BadRequest(new { message = "Dados inválidos" });
    }

    var preferenciaExistente = await _context.PreferenciasUsuario
        .FirstOrDefaultAsync(p => p.UserId == preferencia.UserId);

    if (preferenciaExistente != null)
    {
        // Substitui os campos manualmente
        preferenciaExistente.Genero = preferencia.Genero;
        preferenciaExistente.TamanhoDaRoupa = preferencia.TamanhoDaRoupa;
        preferenciaExistente.CoresPreferidas = preferencia.CoresPreferidas;
        preferenciaExistente.Personalidade = preferencia.Personalidade;
        preferenciaExistente.EstiloRoupa = preferencia.EstiloRoupa;
        preferenciaExistente.IdentidadeVisual = preferencia.IdentidadeVisual;
        preferenciaExistente.DetalhesFavoritos = preferencia.DetalhesFavoritos;
        preferenciaExistente.EstampasFavoritas = preferencia.EstampasFavoritas;
        preferenciaExistente.SapatosFavoritos = preferencia.SapatosFavoritos;
        preferenciaExistente.AcessoriosFavoritos = preferencia.AcessoriosFavoritos;
        preferenciaExistente.PecasFavoritas = preferencia.PecasFavoritas;
        preferenciaExistente.EstiloFinal = preferencia.EstiloFinal;

        _context.PreferenciasUsuario.Update(preferenciaExistente);
    }
    else
    {
        _context.PreferenciasUsuario.Add(preferencia);
    }

    await _context.SaveChangesAsync();
    return Ok(new { message = "Preferências salvas ou atualizadas com sucesso." });
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









[HttpDelete("{userId}")]
public async Task<IActionResult> DeletarPreferencias(int userId)
{
    var preferencia = await _context.PreferenciasUsuario.FirstOrDefaultAsync(p => p.UserId == userId);
    if (preferencia == null)
    {
        return NotFound(new { message = "Preferência não encontrada para exclusão." });
    }

    _context.PreferenciasUsuario.Remove(preferencia);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Preferência deletada com sucesso." });
}







}