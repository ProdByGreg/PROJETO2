using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendCSharp.Models
{
    [Table("preferenciasusuario")]
    public class PreferenciasUsuario
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("genero")]
        public string Genero { get; set; } = string.Empty;

        [Column("tamanho_da_roupa")]
        public string TamanhoDaRoupa { get; set; } = string.Empty;

        [Column("cores_preferidas")]
        public string CoresPreferidas { get; set; } = string.Empty;

        [Column("personalidade")]
        public string Personalidade { get; set; } = string.Empty;

        [Column("estilo_roupa")]
        public string EstiloRoupa { get; set; } = string.Empty;

        [Column("identidade_visual")]
        public string IdentidadeVisual { get; set; } = string.Empty;

        [Column("detalhes_favoritos")]
        public string DetalhesFavoritos { get; set; } = string.Empty;

        [Column("estampas_favoritas")]
        public string EstampasFavoritas { get; set; } = string.Empty;

        [Column("sapatos_favoritos")]
        public string SapatosFavoritos { get; set; } = string.Empty;

        [Column("acessorios_favoritos")]
        public string AcessoriosFavoritos { get; set; } = string.Empty;

        [Column("pecas_favoritas")]
        public string PecasFavoritas { get; set; } = string.Empty;

        [Column("estilo_final")]
        public string EstiloFinal { get; set; } = string.Empty;
    }
}
