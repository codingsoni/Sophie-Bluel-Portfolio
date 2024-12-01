const form = document.getElementById('form-login'); // Sélectionne le formulaire de connexion par son ID

// Ajoute un écouteur d'événement pour intercepter la soumission du formulaire
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)

    const data = new FormData(form); // Crée un objet FormData avec les données du formulaire

    // Envoie une requête POST à l'API pour tenter de connecter l'utilisateur
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST', // Utilise la méthode HTTP POST pour envoyer les données
        headers: {
            'Content-Type': 'application/json;charset=utf-8' // Spécifie que les données sont en JSON
        },
        body: JSON.stringify({
            email: data.get('email'), // Récupère l'email du formulaire
            password: data.get('password') // Récupère le mot de passe du formulaire
        })
    });

    // Si la réponse est positive (connexion réussie)
    if (response.ok) {
        const result = await response.json(); // Convertit la réponse en JSON
        sessionStorage.setItem('token', result.token); // Stocke le token de l'utilisateur dans le sessionStorage pour maintenir la session
        window.location = "index.html"; // Redirige l'utilisateur vers la page d'accueil
    } else {
        // Si la connexion échoue, affiche un message d'erreur
        document.getElementById('error-login').style.visibility = 'visible';
    }
});

