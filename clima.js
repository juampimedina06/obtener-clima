let validacion = 3;

document.getElementById('formulario_pais').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página

    let paisRequerido = document.querySelector('.obtener_pais').value.toLowerCase();

    // Llama a la función para obtener los datos del clima
    await obtenerDatosClima(paisRequerido);

    let paisPedido = document.querySelector('.obtener_pais').value;
    document.querySelector('.pais_ubicacion_texto').innerHTML = paisPedido;

});

const obtenerDatosClima = async (paisRequerido) => {
    const coordenadas = {
    "canada": { "lat": 56.1304, "lon": -106.3468 },
    "mexico": { "lat": 23.6345, "lon": -102.5528 },
    "estados unidos": { "lat": 37.0902, "lon": -95.7129 },
    "brasil": { "lat": -14.2350, "lon": -51.9253 },
    "argentina": { "lat": -38.4161, "lon": -63.6167 },
    "colombia": { "lat": 4.5709, "lon": -74.2973 },
    "chile": { "lat": -35.6751, "lon": -71.5430 },
    "peru": { "lat": -9.1899, "lon": -75.0152 },
    "venezuela": { "lat": 6.4238, "lon": -66.5897 },
    "ecuador": { "lat": -1.8312, "lon": -78.1834 },
    "francia": { "lat": 46.6034, "lon": 1.8883 },
    "alemania": { "lat": 51.1657, "lon": 10.4515 },
    "italia": { "lat": 41.8719, "lon": 12.5674 },
    "españa": { "lat": 40.4637, "lon": -3.7492 },
    "reino unido": { "lat": 55.3781, "lon": -3.4360 },
    "suiza": { "lat": 46.8182, "lon": 8.2275 },
    "paises bajos": { "lat": 52.3676, "lon": 4.9041 },
    "suecia": { "lat": 60.1282, "lon": 18.6435 },
    "noruega": { "lat": 60.4720, "lon": 8.4689 },
    "dinamarca": { "lat": 56.2639, "lon": 9.5018 }
    };

    // Verifica si el país está en el objeto coordenadas
    if (coordenadas[paisRequerido]) {
        validacion = 0;
        const { lat, lon } = coordenadas[paisRequerido];
        
        try {
            let response = await axios(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,is_day,visibility&timezone=auto`);

            let climas = response.data.hourly;
            
            let temperaturaAire = climas.temperature_2m[0]; // Obteniendo la primera hora
            console.log("Temperatura en aire:", temperaturaAire);
            let contenidoActualTemperatura = document.querySelector('.temperatura').innerHTML;
            document.querySelector('.temperatura').innerHTML = temperaturaAire + contenidoActualTemperatura;

            let probabilidadPrecipitacion = climas.precipitation_probability[0];// Devuelve en formato %
            console.log("Probabilidad de precipitacion", probabilidadPrecipitacion,"%");
            let contenidoActualLluvia = document.querySelector('.dato_lluvia').innerHTML;
            document.querySelector('.dato_lluvia').innerHTML = probabilidadPrecipitacion + contenidoActualLluvia;

            let humedad = climas.relative_humidity_2m[0];//Devuelve en formato %
            console.log("Humedad:", humedad,"%")
            let contenidoActualHumedad = document.querySelector('.dato_humedad').innerHTML;
            document.querySelector('.dato_humedad').innerHTML = humedad + contenidoActualHumedad;

            let sensacionTermica = climas.apparent_temperature[0]; //  en formato C°
            console.log("Sensacion termica:", sensacionTermica);
            let contenidoActualTermica = document.querySelector('.dato_termica').innerHTML;
            document.querySelector('.dato_termica').innerHTML = sensacionTermica + contenidoActualTermica;

            let diaNoche = climas.is_day[0]; // 1 si es dia, 0 si es Noche
            console.log("DIA O NOCHE:",diaNoche);
            if( diaNoche === 0){
                document.querySelector('.imagen_dia').style.display="flex";
            }
            else{
                document.querySelector('.imagen_noche').style.display="flex";
            }

            let visibilidadMetros = climas.visibility[0]; //trae el formato a metros
            let visibilidadKilometros = visibilidadMetros / 1000; //paso a kilometros 
            console.log("Visibilidad:", visibilidadKilometros,"km")
            let contenidoActualVisibilidad = document.querySelector('.dato_visibilidad').innerHTML;
            document.querySelector('.dato_visibilidad').innerHTML = visibilidadKilometros + contenidoActualVisibilidad;

        } catch (error) {
            console.error("Error al obtener los datos del clima en tu país:", error);
        }
    } else {
        console.error("País no encontrado");
        validacion = 1;
    }

    if(validacion === 0){
        document.querySelector('.contenedor_informacion_pais').style.display="none";
        document.querySelector('.contenedor_pais').style.display="flex";
        }else{
            document.querySelector('.obtener_pais').style.color="red";
            document.querySelector('.obtener_pais').value = "pais no encontrado";
        }
}

document.querySelector('.obtener_pais').addEventListener("focus",(e)=>{
    document.querySelector('.obtener_pais').value = "";
    document.querySelector('.obtener_pais').style.color="#fff";
})

document.querySelector('.boton_volver').addEventListener("click",(e)=>{
    location.reload();
})



