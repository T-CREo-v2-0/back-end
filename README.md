# T-CREo back-end

Refactorización del backend para la aplicación T-CREo. MiniProyecto de Desarrollo de Software para la USBve.

## Integrantes

* Daniela Ramírez
* Jonathan Bautista
* Ka Fung
* Valeria Herrera

## Tutores

* Yudith Cardinale
* Irvin Dongo
* Ana Aguilera

## Scripts Disponibles

Se requiere de Node v18.16.0 para correr el proyecto.

### Instalación de dependencias
#### Instalar dependencias de Node

```bash
npm install
```
#### Instalar dependencias de Python

- Crea un Virtual Enviroment

```bash
python -m venv venv
source venv/bin/activate
```

- Instala dependencias

```bash
pip install -r requirements.txt
```

### Correr el proyecto en modo de desarrollo

Crea un archiv `.env` en la raíz del proyecto con las siguientes variables de entorno:

```bash
PORT=3000
NODE_ENV=local
DB_URI="mongodb+srv:..."
```

Donde `DB_URI` es la URI de la base de datos de MongoDB que simula la Twitter API y contiene los datos de los usuarios y tweets.


```bash
npm run dev
```

Abre [http://localhost:3000/health](http://localhost:3000/health) para ver el estado del servidor.

## Antiguos Proyectos
La refactorización del back-end se hizo sobre el proyecto [T-CREo v1.0](https://github.com/t-creo). Asimismo, se integró el módulo de [tópicos](https://github.com/magahernandez/get_distance) y los módulos de [análisis semántico y detección de bots](https://github.com/pame07/Tesis-WWW-Extendido).

## Agradecimientos
Agradecemos a Yuni Quintero, Germán Robayo, Nairelys Hernandez, Fabiola Martinez, David Cabeza, Jose Acevedo, Maria Gabriela Hernandez, Pamela Quinteros y Xabier Martínez por sus previos trabajos en el proyecto T-CREo.