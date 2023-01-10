namespace BE_CRUDMascotas.Models.Repository
{
    public interface IMascotaRepository
    {
        Task<List<Mascota>> GetListMascotas();
        Task<Mascota> GetMascota(int id);
        Task DeleteMascota(Mascota mascota);
        Task<Mascota> AddMascota(Mascota mascota);
        Task UpadateMascota(Mascota mascota);
    }
}
