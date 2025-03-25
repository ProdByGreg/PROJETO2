using Microsoft.AspNetCore.Mvc;
using BackendCSharp.Models; // Certifique-se de que o namespace está correto
using System.Collections.Generic;
using System.Linq;

namespace BackendCSharp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefrigerantesController : ControllerBase
    {
        private readonly PizzariaContext _context;

        // Injeção de dependência do PizzariaContext
        public RefrigerantesController(PizzariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Refrigerante>> GetRefrigerantes()
        {
            return _context.Refrigerantes.ToList();
        }
    }
}