using Microsoft.EntityFrameworkCore;

namespace BackendCSharp.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<PreferenciasUsuario> PreferenciasUsuarios { get; set; } // Adicionando a nova tabela

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração para garantir que cada usuário tenha uma única entrada de preferências
            modelBuilder.Entity<PreferenciasUsuario>()
                .HasIndex(p => p.UserId)
                .IsUnique();

            modelBuilder.Entity<PreferenciasUsuario>()
                .HasOne<User>()
                .WithOne()
                .HasForeignKey<PreferenciasUsuario>(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
