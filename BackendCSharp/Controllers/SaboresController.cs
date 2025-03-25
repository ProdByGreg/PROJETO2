using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using BackendCSharp.Models;

[Route("api/[controller]")]
[ApiController]
public class SaboresController : ControllerBase
{
    private readonly PizzariaContext _context;

    public SaboresController(PizzariaContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Sabor>> GetSabores()
    {
        return _context.Sabores.ToList();
    }
}