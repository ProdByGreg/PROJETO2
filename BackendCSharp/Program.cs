using Microsoft.OpenApi.Models;
using BackendCSharp.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços ao container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "BackendCSharp API", Version = "v1" });
});

// Configuração do CORS para permitir todas as origens, métodos e cabeçalhos.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Configuração do banco de dados MySQL para o AppDbContext.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 26))));

var app = builder.Build();

// Configuração do pipeline de requisições HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BackendCSharp API v1"));
}

// Habilita o CORS.
app.UseCors("AllowAll");

// Redireciona requisições HTTP para HTTPS.
app.UseHttpsRedirection();

// Habilita a autorização.
app.UseAuthorization();

// Mapeia os controladores.
app.MapControllers();

// Inicia a aplicação.
app.Run();
