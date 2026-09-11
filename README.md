<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-GAMES STORE</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#13c1ac">
    <link rel="icon" type="image/png" href="imagenes/logo-app.png?v=5">
    <style>
        :root { --wallapop-cyan: #13c1ac; --bg-gray: #f7f9fa; --text-main: #253238; --border: #e0e6e9; }
        body { font-family: 'Inter', sans-serif; background-color: var(--bg-gray); margin: 0; padding-top: 75px; color: var(--text-main); }
        header { position: fixed; top: 0; left: 0; right: 0; height: 65px; background: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 5%; box-shadow: 0 1px 3px rgba(0,0,0,0.1); z-index: 1000; }
        .logo { color: var(--wallapop-cyan); font-size: 22px; font-weight: 800; text-decoration: none; letter-spacing: -0.5px; }
        .search-box { flex-grow: 1; margin: 0 15px; position: relative; max-width: 450px; }
        .search-box input { width: 100%; padding: 10px 15px 10px 40px; border-radius: 20px; border: 1px solid var(--border); background: #f2f4f5; outline: none; font-size: 14px; }
        .search-box i { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #888; }
        .cart-toggle { background: none; border: none; font-size: 20px; cursor: pointer; position: relative; color: var(--text-main); }
        .badge { position: absolute; top: -5px; right: -8px; background: var(--wallapop-cyan); color: white; font-size: 10px; padding: 2px 6px; border-radius: 10px; font-weight: bold; }
        
        /* Navegación de Categorías y Subcategorías */
        .nav-cats-container { background: #fff; border-bottom: 1px solid var(--border); position: sticky; top: 65px; z-index: 999; }
        .nav-cats { display: flex; gap: 10px; padding: 12px 5%; overflow-x: auto; scrollbar-width: none; }
        .chip { padding: 8px 18px; background: #fff; border: 1px solid var(--border); border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: 0.2s; }
        .chip.active { background: var(--wallapop-cyan); color: white; border-color: var(--wallapop-cyan); }
        
        .subcats-container { display: flex; gap: 8px; padding: 0 5% 12px 5%; overflow-x: auto; scrollbar-width: none; background: #fff; min-height: 25px; }
        .subchip { padding: 5px 14px; background: #f2f4f5; border: 1px solid var(--border); border-radius: 15px; font-size: 13px; font-weight: 500; cursor: pointer; white-space: nowrap; transition: 0.2s; }
        .subchip.active { background: var(--text-main); color: white; border-color: var(--text-main); }

        .container { max-width: 1100px; margin: 20px auto; padding: 0 15px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 15px; }
        .card { background: #fff; border-radius: 8px; border: 1px solid var(--border); overflow: hidden; display: flex; flex-direction: column; transition: 0.2s; }
        .card img { width: 100%; height: 160px; object-fit: cover; background: #f9f9f9; }
        .card-body { padding: 12px; flex-grow: 1; display: flex; flex-direction: column; }
        .price { font-size: 18px; font-weight: 800; margin: 0; color: #000; }
        .name { font-size: 13px; color: #666; margin: 4px 0 12px 0; height: 32px; overflow: hidden; line-height: 1.2; }
        .add-btn { width: 100%; padding: 8px; background: #fff; color: var(--wallapop-cyan); border: 2px solid var(--wallapop-cyan); border-radius: 6px; font-weight: 800; cursor: pointer; }
        .cart-sidebar { position: fixed; top: 0; right: -350px; width: 320px; height: 100%; background: #fff; z-index: 2000; box-shadow: -2px 0 15px rgba(0,0,0,0.1); transition: 0.3s; display: flex; flex-direction: column; padding: 20px; box-sizing: border-box; }
        .cart-sidebar.open { right: 0; }
        .btn-whatsapp { background: #25d366; color: white; text-align: center; padding: 15px; border-radius: 10px; text-decoration: none; font-weight: 800; }
        @media (max-width: 500px) { .grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
    </style>
</head>

<body>
    <div id="install-banner" style="display: none; background: #13c1ac; color: white; padding: 15px; position: fixed; bottom: 0; left: 0; width: 100%; z-index: 9999; text-align: center; font-family: sans-serif;">
        <span>¡Instalá la App de <b>E-GAMES STORE</b>!</span>
        <button id="btn-install" style="background: white; color: #13c1ac; border: none; padding: 8px 15px; margin-left: 15px; border-radius: 5px; font-weight: bold; cursor: pointer;">INSTALAR</button>
        <button id="btn-close" style="background: transparent; color: white; border: none; margin-left: 10px; font-size: 18px; cursor: pointer;">×</button>
    </div>

    <header>
        <a href="#" class="logo">E-GAMES STORE</a>
        <div class="search-box">
            <i class="fa fa-search"></i>
            <input type="text" id="mainSearch" placeholder="Busca tu juego o producto...">
        </div>
        <button class="cart-toggle" onclick="toggleCart()">
            <i class="fa fa-shopping-basket"></i>
            <span class="badge" id="cart-count">0</span>
        </button>
    </header>

    <div class="nav-cats-container">
        <div class="nav-cats" id="mainCategories">
            <div class="chip active" onclick="selectCategory('todos', this)">Todos</div>
            <div class="chip" onclick="selectCategory('nintendo', this)">Nintendo</div>
            <div class="chip" onclick="selectCategory('playstation', this)">PlayStation</div>
            <div class="chip" onclick="selectCategory('xbox series', this)">Xbox Series</div>
            <div class="chip" onclick="selectCategory('consolas', this)">Consolas</div>
            <div class="chip" onclick="selectCategory('joysicks', this)">Joysicks</div>
            <div class="chip" onclick="selectCategory('funkos', this)">Funkos</div>
            <div class="chip" onclick="selectCategory('indumentaria', this)">Indumentaria</div>
            <div class="chip" onclick="selectCategory('otros', this)">Otros</div>
            <div class="chip" onclick="selectCategory('contacto', this)">Contacto</div>
        </div>
        <div class="subcats-container" id="subCategories">
            <!-- Las subcategorías se generan dinámicamente según la categoría principal seleccionada -->
        </div>
    </div>

    <div class="container">
        <div class="grid" id="productGrid"></div>
    </div>

    <div class="cart-sidebar" id="sidebar">
        <div class="cart-header" style="display:flex; justify-content:space-between;">
            <h3 style="margin:0">Mi Pedido</h3>
            <button onclick="toggleCart()" style="border:none; background:none; font-size:24px;">&times;</button>
        </div>
        <ul id="cart-list" style="list-style:none; padding:0; flex-grow:1; overflow-y:auto;"></ul>
        <div class="total-area" id="cart-total" style="font-weight:800; padding:15px 0;">Total: $0</div>
        <a href="javascript:void(0)" class="btn-whatsapp" onclick="sendToWA()">ENVIAR PEDIDO</a>
    </div>

    <script>
        // Estructura de datos adaptada para E-Games Store (con categoría 'c' y subcategoría 's')
        const data = [
            { n: "Nintendo Switch Consola Standard", p: 350000, i: "nintendo-switch.jpg", c: "nintendo", s: "nintendo switch" },
            { n: "Nintendo Switch 2 Preventa", p: 550000, i: "nintendo-switch-2.jpg", c: "nintendo", s: "nintendo switch 2" },
            { n: "Consola PlayStation 5", p: 850000, i: "ps5.jpg", c: "playstation", s: "ps5" },
            { n: "Consola PlayStation 4", p: 450000, i: "ps4.jpg", c: "playstation", s: "ps4" },
            { n: "Joystick Xbox Series X/S Carbon Black", p: 75000, i: "xbox-joystick.jpg", c: "xbox series", s: "" },
            { n: "Consola Xbox Series S 512GB", p: 500000, i: "xbox-series-s.jpg", c: "consolas", s: "xbox series" },
            { n: "Joystick DualSense PS5 White", p: 85000, i: "joystick-ps5.jpg", c: "joysicks", s: "ps5" },
            { n: "Funko Pop Gaming Exclusivo", p: 25000, i: "funko.jpg", c: "funkos", s: "" },
            { n: "Remera Gamer E-Games Edition", p: 18000, i: "remera-gamer.jpg", c: "indumentaria", s: "" },
            { n: "Sticker Pack Videojuegos", p: 3000, i: "stickers.jpg", c: "otros", s: "" }
        ];

        // Definición de las subcategorías para cada solapa principal
        const subcategoriesMap = {
            'todos': [],
            'nintendo': ['Nintendo Switch', 'Nintendo Switch 2'],
            'playstation': ['PS5', 'PS4'],
            'xbox series': [], // Entra directo sin rama
            'consolas': ['Switch', 'Switch 2', 'PS4', 'PS5', 'Xbox Series'],
            'joysicks': ['Switch', 'Switch 2', 'PS4', 'PS5', 'Xbox Series'],
            'funkos': [], // Entra directo sin rama
            'indumentaria': [], // Entra directo sin rama
            'otros': [], // Entra directo sin rama
            'contacto': [] // Entra directo sin rama
        };

        let currentMainCat = 'todos';
        let currentSubCat = '';
        let cart = [];
        const grid = document.getElementById('productGrid');

        function render() {
            grid.innerHTML = '';
            const searchVal = document.getElementById('mainSearch').value.toLowerCase();

            let filtered = data.filter(p => {
                let matchCat = (currentMainCat === 'todos' || p.c === currentMainCat);
                let matchSub = (currentSubCat === '' || (p.s && p.s.toLowerCase() === currentSubCat.toLowerCase()));
                let matchSearch = p.n.toLowerCase().includes(searchVal);
                return matchCat && matchSub && matchSearch;
            });

            // Manejo especial visual si se selecciona "Contacto"
            if (currentMainCat === 'contacto') {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; background: white; padding: 30px; border-radius: 8px; text-align: center; border: 1px solid var(--border);">
                        <h3>¡Contactate con E-Games Store!</h3>
                        <p>¿Tenés alguna duda sobre stock, envíos o medios de pago? Escribinos directamente.</p>
                        <a href="https://wa.me/542494266209?text=Hola!%20Tengo%20una%20consulta%20sobre%20E-Games%20Store" class="btn-whatsapp" style="display:inline-block; margin-top: 15px; padding: 12px 25px;">Abrir WhatsApp</a>
                    </div>
                `;
                return;
            }

            if (filtered.length === 0) {
                grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #888;">No se encontraron productos en esta sección.</div>`;
                return;
            }

            filtered.forEach(p => {
                grid.innerHTML += `
                <div class="card">
                    <img src="imagenes/${p.i}" onerror="this.src='https://via.placeholder.com/160?text=E-Games'">
                    <div class="card-body">
                        <p class="price">$${p.p.toLocaleString()}</p>
                        <p class="name">${p.n}</p>
                        <button class="add-btn" onclick="addToCart('${p.n}', ${p.p})">Añadir</button>
                    </div>
                </div>`;
            });
        }

        function selectCategory(cat, el) {
            document.querySelectorAll('#mainCategories .chip').forEach(c => c.classList.remove('active'));
            el.classList.add('active');
            
            currentMainCat = cat;
            currentSubCat = ''; // Reseteamos la subcategoría al cambiar de pestaña principal
            
            updateSubcategoriesUI(cat);
            render();
        }

        function updateSubcategoriesUI(cat) {
            const subContainer = document.getElementById('subCategories');
            subContainer.innerHTML = '';
            
            const subs = subcategoriesMap[cat] || [];
            if (subs.length > 0) {
                subContainer.style.display = 'flex';
                // Agregamos opción "Todas" para las subcategorías
                let allSubHtml = `<div class="subchip active" onclick="selectSubCategory('', this)">Todas</div>`;
                subContainer.innerHTML += allSubHtml;

                subs.forEach(sub => {
                    subContainer.innerHTML += `<div class="subchip" onclick="selectSubCategory('${sub}', this)">${sub}</div>`;
                });
            } else {
                subContainer.style.display = 'none';
            }
        }

        function selectSubCategory(sub, el) {
            document.querySelectorAll('.subchip').forEach(c => c.classList.remove('active'));
            el.classList.add('active');
            currentSubCat = sub;
            render();
        }

        function toggleCart() { 
            document.getElementById('sidebar').classList.toggle('open'); 
        }

        function addToCart(n, p) { 
            cart.push({name:n, price:p}); 
            updateUI(); 
        }

        function updateUI() {
            const list = document.getElementById('cart-list');
            list.innerHTML = '';
            let sum = 0;
            cart.forEach((item) => {
                sum += item.price;
                list.innerHTML += `<li style="display:flex; justify-content:space-between; padding:5px 0; border-bottom: 1px solid #f2f4f5; font-size: 13px;">
                    ${item.name} <span>$${item.price.toLocaleString()}</span>
                </li>`;
            });
            document.getElementById('cart-count').innerText = cart.length;
            document.getElementById('cart-total').innerText = `Total: $${sum.toLocaleString()}`;
        }

        function sendToWA() {
            if(cart.length === 0) return alert('El carrito está vacío');
            const miNumero = "542494266209"; 
            const miAlias = "egames.store";
            let texto = `Hola! Mi pedido en E-Games Store es:\n\n`;
            cart.forEach(i => { texto += `- ${i.name} ($${i.price.toLocaleString()})\n`; });
            let total = cart.reduce((a, b) => a + b.price, 0);
            texto += `\n*Total a pagar: $${total.toLocaleString()}*`;
            texto += `\n\n*¿Cómo confirmo?*`;
            texto += `\n1️⃣ Transferí al Alias: *${miAlias}*`;
            texto += `\n2️⃣ Enviame el comprobante por acá.`;
            texto += `\n\n⚠️ *¡Te reservo el pedido para que no se agote y lo pasás a retirar cuando quieras!* 🏃‍♂️💨`;
            const mensajeFinal = encodeURIComponent(texto);
            window.open(`https://wa.me/${miNumero}?text=${mensajeFinal}`);
        }

        document.getElementById('mainSearch').oninput = () => {
            render();
        };

        // Inicializar renderizado
        render();
    </script>

    <script>
        if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js?v=4'); }
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            document.getElementById('install-banner').style.display = 'block';
        });
        document.getElementById('btn-install').addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt = null;
                document.getElementById('install-banner').style.display = 'none';
            }
        });
        document.getElementById('btn-close').addEventListener('click', () => {
            document.getElementById('install-banner').style.display = 'none';
        });
    </script>
</body>
</html>
