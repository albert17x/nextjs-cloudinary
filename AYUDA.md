         # Seleccion de imagen para subir
        <form>
          <input type='file' onChange={(e) => {
            console.log(e.target.files[0])
          }} />
        </form>