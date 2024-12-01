// Exécute le code lorsque le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    initWorks(); // Initialise et affiche les projets dans la galerie
    showCategories(); // Affiche les catégories pour le filtrage des projets
    handleUserSession(); // Vérifie si l'utilisateur est connecté et ajuste l'interface
    handleEditModeBar(); // Affiche ou cache la barre de mode édition en fonction de l'état de connexion
});

// Fonction pour vérifier la session de l'utilisateur et ajuster l'interface
function handleUserSession() {
    // Vérifie si un token est présent dans le sessionStorage
    if (sessionStorage.getItem('token') !== null) {
        setupEditMode(); // Si le token existe, active le mode édition
    } else {
        hideEditButtons(); // Si le token n'existe pas, cache les boutons d'édition
    }
}

// Fonction pour activer le mode édition pour les utilisateurs connectés
function setupEditMode() {
    const linkLoginBtn = document.querySelector('.link-login'); // Sélectionne le bouton de connexion
    if (linkLoginBtn) {
        linkLoginBtn.innerHTML = "logout"; // Change le texte du bouton pour "logout"
        linkLoginBtn.href = '#'; // Change le lien du bouton pour rester sur la même page

        // Ajoute un événement au clic pour déconnecter l'utilisateur
        linkLoginBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le comportement par défaut du lien
            sessionStorage.removeItem('token'); // Supprime le token de session pour déconnecter l'utilisateur
            window.location = "index.html"; // Redirige vers la page d'accueil après déconnexion
        });
    }

    const filter = document.querySelector('.filter');
    if (filter) filter.style.display = 'none'; // Cache le filtre des projets en mode édition

    const editBtn = document.querySelectorAll('.edit-btn'); // Sélectionne tous les boutons d'édition
    if (editBtn) {
        editBtn.forEach(item => {
            item.style.display = 'inline-flex'; // Affiche chaque bouton d'édition
        });

        // Ajoute un événement au clic sur chaque bouton d'édition
        editBtn.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault(); // Empêche le comportement par défaut
                const modalContainer = document.querySelector('.modal-container');
                if (modalContainer) modalContainer.style.display = 'flex'; // Affiche la fenêtre modale
                showPhotoGallery(); // Affiche la galerie de photos dans la modale
            });
        });
    }

    setupAddWorkListeners(); // Configure les événements pour l'ajout de nouveaux projets
}

// Fonction pour cacher les boutons d'édition pour les utilisateurs non connectés
function hideEditButtons() {
    const editBtn = document.querySelectorAll('.edit-btn'); // Sélectionne tous les boutons d'édition
    if (editBtn) {
        editBtn.forEach(item => {
            item.style.display = 'none'; // Cache chaque bouton d'édition
        });
    }
}

// Fonction pour configurer les événements d'ajout de nouveaux travaux
function setupAddWorkListeners() {
    const btnAddWork = document.querySelector('.btn-addwork');
    if (btnAddWork) {
        btnAddWork.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le comportement par défaut du bouton

            // Configure l'affichage de la fenêtre modale pour l'ajout d'un nouveau projet
            const modalComeback = document.querySelector('.modal-comeback');
            if (modalComeback) modalComeback.style.visibility = 'visible';

            const modalTitle = document.querySelector('.modal-title');
            if (modalTitle) modalTitle.innerHTML = 'Ajout photo';

            const modalGallery = document.querySelector('.modal-gallery');
            if (modalGallery) modalGallery.style.display = 'none';

            const modalAddwork = document.querySelector('.modal-addwork');
            if (modalAddwork) modalAddwork.style.display = 'block';

            const modalBottomBtn = document.querySelector('.modal-bottom-btn');
            if (modalBottomBtn) modalBottomBtn.style.display = 'none';

            const uploadWorkImg = document.querySelector('.upload-work-img');
            if (uploadWorkImg) uploadWorkImg.style.display = 'none';

            const uploadWorkForm = document.querySelector('.upload-work-form');
            if (uploadWorkForm) uploadWorkForm.style.display = 'flex';

            const btnSubmitWork = document.querySelector('.btn-submit-work');
            if (btnSubmitWork) btnSubmitWork.style.backgroundColor = 'rgb(167, 167, 167)';

            const titleAddwork = document.querySelector('.title-addwork');
            if (titleAddwork) titleAddwork.value = '';

            const imgAddwork = document.querySelector('.img-addwork');
            if (imgAddwork) imgAddwork.value = '';

            const categoriesAddwork = document.querySelector('.categories-addwork');
            if (categoriesAddwork) categoriesAddwork.selectedIndex = 0;
        });
    }

    const modalComeback = document.querySelector('.modal-comeback');
    if (modalComeback) {
        modalComeback.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le comportement par défaut du bouton
            showPhotoGallery(); // Affiche la galerie de photos
        });
    }

    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le comportement par défaut du bouton
            const modalContainer = document.querySelector('.modal-container');
            if (modalContainer) modalContainer.style.display = 'none'; // Cache la fenêtre modale
        });
    }

    const modalContainer = document.querySelector('.modal-container'); // Sélectionne le conteneur de la modale
    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            if (e.target.classList.value === "modal-container") // Vérifie si l'utilisateur clique à l'extérieur de la modale
                modalContainer.style.display = 'none'; // Cache la fenêtre modale
        });
    }

    const uploadWorkForm = document.querySelector('.upload-work-form'); // Sélectionne le formulaire de téléchargement
    if (uploadWorkForm) {
        uploadWorkForm.addEventListener('change', (e) => {
            uploadWorkForm.style.display = 'none'; // Cache le formulaire de téléchargement
            const uploadWorkImg = document.querySelector('.upload-work-img'); // Sélectionne la zone d'affichage de l'image téléchargée
            if (uploadWorkImg) {
                uploadWorkImg.style.display = 'flex'; // Affiche la zone d'image téléchargée
                uploadWorkImg.innerHTML = ''; // Vide le contenu précédent de la zone
                uploadWorkImg.insertAdjacentHTML('beforeend', 
                    `<img src="${URL.createObjectURL(e.target.files[0])}" 
                    alt="${e.target.files[0].name}" 
                    class="current-img-upload">` // Affiche l'image téléchargée dans la zone
                );
            }
        });
    }

    const addWorkForm = document.getElementById('addwork-form');
    if (addWorkForm) {
        addWorkForm.addEventListener('input', () => {
            const btnSubmitWork = document.querySelector('.btn-submit-work');
            const titleAddwork = document.querySelector('.title-addwork');
            const imgAddwork = document.querySelector('.img-addwork');
            if (btnSubmitWork && titleAddwork && imgAddwork) {
                btnSubmitWork.style.backgroundColor = 
                    titleAddwork.value.length > 0 && imgAddwork.value.length > 0 
                    ? '' 
                    : 'rgb(167, 167, 167)'; // Active ou désactive le bouton de soumission
            }
        });

        addWorkForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le comportement par défaut du formulaire
            addWork(); // Appelle la fonction pour ajouter un projet via l'API
        });
    }
}

// Fonction pour afficher un projet dans la galerie et la modale
function showWork(el) {
    const work = 
        `<figure data-category="${el.categoryId}" data-id="${el.id}">
            <img src="${el.imageUrl}" alt="${el.title}">
            <figcaption>${el.title}</figcaption>
        </figure>`; // Crée l'élément HTML pour le projet

    const gallery = document.querySelector('.gallery');
    if (gallery) gallery.insertAdjacentHTML('beforeend', work); // Ajoute le projet à la galerie

    const content = 
        `<figure data-id="${el.id}">
            <img src="${el.imageUrl}" alt="${el.title}">
            <button class="btn-del-icon" data-id="${el.id}">
                <img src="assets/icons/bin-icon.svg" alt="Icône d'une corbeille">
            </button>
        </figure>`; // Crée l'élément HTML pour le projet dans la modale

    const modalGallery = document.querySelector('.modal-gallery');
    if (modalGallery) modalGallery.insertAdjacentHTML('beforeend', content); // Ajoute le projet à la modale

    attachDeleteEvents(); // Réattache les événements de suppression pour chaque projet
}

// Fonction pour réattacher les événements de suppression
function attachDeleteEvents() {
    const btnDelIcons = document.querySelectorAll('.btn-del-icon');
    if (btnDelIcons) {
        btnDelIcons.forEach(item => {
            item.removeEventListener('click', handleDeleteClick); // Supprime l'ancien événement de clic
            item.addEventListener('click', handleDeleteClick); // Ajoute un nouvel événement de clic pour la suppression
        });
    }
}

// Fonction pour gérer le clic sur le bouton de suppression
function handleDeleteClick(e) {
    e.preventDefault(); // Empêche le comportement par défaut du bouton
    const btnDelIcon = e.target.closest('.btn-del-icon');
    if (btnDelIcon) {
        deleteWork(btnDelIcon.dataset.id); // Supprime le projet en appelant l'API
    }
}

// Fonction pour initialiser l'affichage des projets dans la galerie
async function initWorks() {
    try {
        const resultFetch = await fetch('http://localhost:5678/api/works'); // Récupère les projets depuis l'API
        const data = await resultFetch.json(); // Convertit la réponse en JSON

        for (const el of data) {
            showWork(el); // Affiche chaque projet dans la galerie et la modale
        }

        attachDeleteEvents(); // Réattache les événements de suppression après l'affichage des projets
    } catch (error) {
        console.log("Une erreur est survenue lors de l'initialisation des travaux."); // Affiche une erreur dans la console en cas d'échec
    }
}

// Fonction pour ajouter un nouveau projet via l'API
async function addWork() {
    try {
        const picture = document.querySelector('.img-addwork').files[0]; // Sélectionne l'image téléchargée
        const title = document.querySelector('.title-addwork'); // Sélectionne le champ de titre
        const category = document.querySelector('.categories-addwork'); // Sélectionne la catégorie

        if(!picture || !['image/jpeg', 'image/png', 'image/jpg'].includes(picture.type)) {
            alert("L'image n'est pas sélectionnée ou son format est incorrect."); // Affiche un message d'erreur si l'image n'est pas correcte
            return;
        }

        if(title.value.length <= 0) {
            alert("Veuillez entrer un titre."); // Affiche un message d'erreur si le titre est vide
            return;
        }

        if(category.value.length <= 0) {
            alert("Veuillez sélectionner une catégorie."); // Affiche un message d'erreur si la catégorie n'est pas sélectionnée
            return;
        }

        const formData = new FormData(document.getElementById('addwork-form')); // Crée un FormData à partir du formulaire

        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: formData
        });

        if(response.ok) {
            const data = await response.json(); // Convertit la réponse en JSON
            showWork(data); // Affiche le nouveau projet dans la galerie
            const modalContainer = document.querySelector('.modal-container');
            if (modalContainer) modalContainer.style.display = 'none'; // Ferme la fenêtre modale après ajout
            document.querySelector('.gallery').scrollIntoView({ behavior: 'smooth' }); // Fait défiler la page pour voir le nouveau projet
        } else {
            console.log("Erreur lors de la création du projet."); // Affiche un message d'erreur dans la console en cas d'échec
        }
    } catch (error) {
        console.log("Une erreur est survenue lors de l'ajout d'un nouveau projet."); // Affiche une erreur dans la console en cas d'exception
    }
}

// Fonction pour supprimer un projet via l'API
async function deleteWork(id) {
    try {
        const resultFetch = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if(resultFetch.ok) {
            document.querySelectorAll(`figure[data-id="${id}"]`).forEach(item => {
                item.parentNode.removeChild(item); // Supprime les éléments HTML correspondant au projet supprimé
            });
        } else {
            alert("Erreur lors de la suppression."); // Affiche un message d'erreur si la suppression échoue
        }
    } catch (error) {
        console.log("Une erreur est survenue lors de la suppression."); // Affiche une erreur dans la console en cas d'exception
    }
}

// Fonction pour filtrer les projets par catégorie
function filterWorks(category) {
    const galleryFigures = document.querySelector('.gallery').getElementsByTagName("figure");
    for (const figure of galleryFigures) {
        figure.style.display = category == figure.dataset.category || category == 0 ? "block" : "none"; // Affiche ou cache les projets selon la catégorie sélectionnée
    }
}

// Fonction pour afficher les catégories pour le filtrage
async function showCategories() {
    try {
        const resultFetch = await fetch('http://localhost:5678/api/categories'); // Récupère les catégories depuis l'API
        const data = await resultFetch.json(); // Convertit la réponse en JSON

        for (const el of data) {
            const liBtn = 
            `<li>
                <button class="btn" data-category="${el.id}">${el.name}</button>
            </li>`;

            document.querySelector('.btn-list').insertAdjacentHTML('beforeend', liBtn); // Ajoute chaque bouton à la liste des catégories
            document.querySelector('.categories-addwork').insertAdjacentHTML('beforeend', `<option value="${el.id}">${el.name}</option>`); // Ajoute chaque catégorie dans la liste déroulante
        }

        const buttons = document.querySelectorAll('.btn'); // Sélectionne tous les boutons de catégories
        buttons.forEach(item => {
            item.addEventListener('click', (e) => {
                buttons.forEach(btn => btn.classList.remove('btn-active')); // Retire la classe active de tous les boutons
                e.target.classList.toggle("btn-active"); // Active le bouton cliqué
                filterWorks(e.target.dataset.category); // Filtre les projets en fonction de la catégorie sélectionnée
            });
        });
    } catch (e) {
        console.log(e); // Affiche l'erreur dans la console
        alert("Une erreur est survenue lors de la récupération des catégories."); // Affiche un message d'erreur
    }
}

// Fonction pour afficher la galerie de photos dans la modale
function showPhotoGallery() {
    const modalComeback = document.querySelector('.modal-comeback');
    if (modalComeback) modalComeback.style.visibility = 'hidden'; // Cache le bouton de retour

    const modalTitle = document.querySelector('.modal-title');
    if (modalTitle) modalTitle.innerHTML = 'Galerie photo'; // Modifie le titre de la modale

    const modalAddwork = document.querySelector('.modal-addwork');
    if (modalAddwork) modalAddwork.style.display = 'none'; // Cache le formulaire d'ajout de projet

    const modalGallery = document.querySelector('.modal-gallery');
    if (modalGallery) modalGallery.style.display = 'grid'; // Affiche la galerie de photos

    const modalBottomBtn = document.querySelector('.modal-bottom-btn');
    if (modalBottomBtn) modalBottomBtn.style.display = 'flex'; // Affiche les boutons de la modale

    const btnDeletework = document.querySelector('.btn-deletework');
    if (btnDeletework) btnDeletework.style.display = 'block'; // Affiche le bouton de suppression de projet
}

// Fonction pour gérer l'affichage de la barre de mode édition
function handleEditModeBar() {
    const editModeBar = document.querySelector('.editmode'); // Sélectionne la barre de mode édition
    if (editModeBar) {
        if (sessionStorage.getItem('token') !== null) {
            editModeBar.style.display = 'flex';  // Affiche la barre noire si connecté
            document.querySelector('header').style.paddingTop = '60px'; // Ajuste le padding du header
        } else {
            editModeBar.style.display = 'none';  // Cache la barre noire si non connecté
            document.querySelector('header').style.paddingTop = '0'; // Réinitialise le padding du header
        }
    }
}




