/**
 * @TODODEV :
 * Mettre le lien courant en surbrillance en ajoutant la classe active
 */

/**
 * À utiliser comme un wrapper de <nav> contenant une ou plusieurs liste <ol> et <ul> et eux mêmes contenant des <li>
 * Ajouter le nombre de col et line dans le <gridnav-wrapper col="5" line="5">
 */
class GridNavWrapper extends HTMLElement {
 
    constructor() {
        var self = super();
        this.self = self;

         /** ==============================
         * Récupération des données
        ================================ */

        this.nav = this.self.querySelector("nav");
        this.navLinkList = this.nav.querySelectorAll("ul, ol");
        this.col = this.self.getAttribute("col");
        this.line = this.self.getAttribute("line");

        /** ==============================
         * Construction des éléments
        ================================ */

        // Ajoute d'un boutton d'action d'ouverture fermeture de popin
        this.actionBtn = document.createElement("button");
        this.actionBtn.classList.add("close");
        this.actionBtn.classList.add("actionbtn");
        this.actionBtn.innerHTML = "Site Map";
        this.actionBtn.addEventListener('click', this.onClick);

        // Création d'un élément DOM en grille
        this.grid = document.createElement("div");
        // pour chaque i ligne et j colonne du GridNavWrapper, on crée i div de j div
        for( var i = 1; i <= this.line; i++) {
            var newLine = document.createElement("div");
            newLine.classList.add("line");
            newLine.setAttribute('index', i);
            this.grid.appendChild(newLine);
            for( var j = 1; j <= this.col; j++) {
                var newElem = document.createElement("div");
                newElem.classList.add("elem");
                newElem.classList.add("empty");
                newElem.setAttribute('index', j);
                newLine.appendChild(newElem);
            }
        }

        // Clonage de la grille pour ajouter à la miniature
        this.minGrid = this.grid.cloneNode([true]);

        // On insère les élément du nav dans les grilles
        this.insertNavItem();

        // Construction de la popin principale
        this.popin = document.createElement("div");
        this.popin.classList.add("popin");
        this.grid.classList.add("grille");
        this.popin.appendChild(this.grid);

        // Construction de la popin miniature
        this.minPopin = document.createElement("div");
        this.minPopin.classList.add("minPopin");
        this.minGrid.classList.add("minGrille");
        this.minPopin.appendChild(this.minGrid);

        /** ==============================
         * Ajout des élément dans le node
        ================================ */

        // Ajout des popins dans le DOM
        this.self.appendChild(this.actionBtn);
        this.self.appendChild(this.minPopin);
        this.self.appendChild(this.popin);
        // this.self.appendChild(this.buildStyle()); // non utilisé car place le style en inline, impossible à overwritte par la suite

        /** ==============================
         * Les évènements OnClick
        ================================ */

        // Au clic sur la miniature, on ouvre la popin
        this.onOpen = this.onOpen.bind(this);
        this.minGrid.addEventListener('click', this.onOpen);

        // Au clic sur le bouton, on ferme la popin
        this.onClose = this.onClose.bind(this);
        this.actionBtn.addEventListener('click', this.onClose)

    }

    /**
     * Renvoie le style par défault
     * Le style en SCSS est plus bas en commentaires
     */
    buildStyle () {
        var style = document.createElement("style");
        style.innerHTML = `<style>
        gridnav-wrapper {
            position: relative;
       }
        gridnav-wrapper .actionbtn {
            position: fixed;
            top: 15px;
            right: 15px;
            width: 80px;
            height: 80px;
            background-color: white;
            border: 1px solid black;
            z-index: 2001;
       }
        gridnav-wrapper .actionbtn:hover + .minPopin:not(.opened) {
            display: block;
       }
        gridnav-wrapper .minPopin {
            position: fixed;
            top: 15px;
            right: 15px;
            width: 80px;
            height: 80px;
            display: none;
            background-color: rgba(0, 0, 0, .8);
            z-index: 2002;
       }
        gridnav-wrapper .minPopin:hover:not(.opened) {
            display: block;
       }
        gridnav-wrapper .minPopin .minGrille {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
       }
        gridnav-wrapper .minPopin .minGrille .line {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
       }
        gridnav-wrapper .minPopin .minGrille .line .elem {
            width: 6px;
            height: 6px;
            margin: 2px;
       }
        gridnav-wrapper .minPopin .minGrille .line .elem.empty {
            background-color: grey;
            opacity: 0.1;
       }
        gridnav-wrapper .minPopin .minGrille .line .elem.full {
            background-color: orangered;
       }
        gridnav-wrapper .popin {
            display: none;
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .8);
            z-index: 2000;
       }
        gridnav-wrapper .popin .grille {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
       }
        gridnav-wrapper .popin .grille .line {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
       }
        gridnav-wrapper .popin .grille .line .elem {
            width: 80px;
            height: 80px;
            margin: 10px;
            display: flex;
       }
        gridnav-wrapper .popin .grille .line .elem a {
            margin: auto;
       }
        gridnav-wrapper .popin .grille .line .elem.empty {
            background-color: rgba(0, 0, 0, .1);
       }
        gridnav-wrapper .popin .grille .line .elem.full {
            background-color: white;
            border: 1px solid black;
       }
       </style>`;
       return style;
    }

    // Pour fermer la popin principale
    onOpen(e) {
        var popin = this.querySelector(".popin");
        var minPopin = this.querySelector(".minPopin");
        var actionBtn = this.querySelector(".actionbtn");
        if( popin.style.display !== "block") {
            popin.style.display = "block";
            minPopin.classList.add("opened");
            actionBtn.innerHTML = "Close";
        }
    }

    // Pour affiche la popin principale
    onClose(e) {
        var popin = this.querySelector(".popin");
        var minPopin = this.querySelector(".minPopin");
        var actionBtn = this.querySelector(".actionbtn");
        if( popin.style.display === "block") {
            popin.style.display = "none";
            minPopin.classList.remove("opened");
            actionBtn.innerHTML = "Nav";
        }
    }

    // récupère les éléments du nav et les insère dans les grids
    insertNavItem() {
        this.navLinkList.forEach( (element, index) => {
            var lis = element.querySelectorAll('li');
            lis.forEach(el => {
                var col = el.getAttribute("col");
                var line = el.getAttribute("line");
                this.grid.children[line].children[col].innerHTML = el.innerHTML;
                this.grid.children[line].children[col].classList.remove("empty");
                this.grid.children[line].children[col].classList.add("full");
                this.grid.children[line].children[col].addEventListener('click', this.onClose.bind(this))
                this.minGrid.children[line].children[col].classList.remove("empty");
                this.minGrid.children[line].children[col].classList.add("full");
                this.minGrid.children[line].children[col].addEventListener('click', this.onClose.bind(this));
            });
        });
    }
}

customElements.define('gridnav-wrapper', GridNavWrapper);