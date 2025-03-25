using Microsoft.EntityFrameworkCore;
using BackendCSharp.Models;

public class PizzariaContext : DbContext
{
    public DbSet<Sabor> Sabores { get; set; }
    public DbSet<Refrigerante> Refrigerantes { get; set; }

    public PizzariaContext(DbContextOptions<PizzariaContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

    }
}