public class PreferenciasUsuario
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Genero { get; set; } = string.Empty;
    public decimal Altura { get; set; }
    public string TamanhoDaRoupa { get; set; } = string.Empty;
    public string CoresPreferidas { get; set; } = string.Empty;
    public string Personalidade { get; set; } = string.Empty;
    public string EstiloRoupa { get; set; } = string.Empty;
    public string IdentidadeVisual { get; set; } = string.Empty;
    public string DetalhesFavoritos { get; set; } = string.Empty;
    public string EstampasFavoritas { get; set; } = string.Empty;
    public string SapatosFavoritos { get; set; } = string.Empty;
    public string AcessoriosFavoritos { get; set; } = string.Empty;
    public string PecasFavoritas { get; set; } = string.Empty;
}
