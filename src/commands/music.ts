import { Client, Message, MessageMedia } from "whatsapp-web.js";
import path from "path";
import fs from "fs";
import ytdl from "ytdl-core";
const { spawn } = require("child_process");

export async function music(msg: Message, client: Client) {
    try {
        const videoURL = msg.body.split(' ')[1];
        if (videoURL.includes('you')) {
            msg.react('🎵');
            msg.reply('🟢 *Downloading* ⌛');
            const info = await ytdl.getInfo(videoURL);
            const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
            const filePath = `./audio/${info.videoDetails.title}.mp3`;

            await new Promise((resolve, reject) => {
                ytdl(videoURL, { format: format })
                    .pipe(fs.createWriteStream(filePath))
                    .on('finish', resolve)
                    .on('error', reject);
            });
            const media = MessageMedia.fromFilePath(filePath);
            msg.react('🟢');
            msg.reply(media, undefined, { sendMediaAsDocument: true, caption: " " })
        }
        else if (videoURL.includes('spotify')) {
            msg.react('🎵');
            msg.reply('🟢 *Downloading* ⌛');
            //directorios

            const directorioMusica = 'C:\\Users\\sandr\\Desktop\\HaloBot.ts\\src\\music';

            function eliminarDirectoriosMusica() {
                fs.readdir(directorioMusica, (error, archivos) => {
                    if (error) {
                        console.error(`Error al leer el directorio ${directorioMusica}:`, error);
                        return;
                    }

                    archivos.forEach((archivo) => {
                        const rutaArchivo = path.join(directorioMusica, archivo);

                        if (fs.lstatSync(rutaArchivo).isDirectory()) {
                            eliminarDirectorio(rutaArchivo);
                        }
                    });

                    console.log('Directorios de música eliminados correctamente.');
                    // Ejecutar el comando spotifydl aquí
                    process.chdir(directorioMusica);
                    const childProcess = spawn(`spotifydl ${videoURL}`, { detached: true, shell: true });

                    childProcess.stdout.on('data', (data: any) => {
                        console.log(`stdout: ${data}`);
                    });

                    childProcess.stderr.on('data', (data: any) => {
                        console.error(`stderr: ${data}`);
                    });

                    childProcess.on('close', (code: any) => {
                        seleccionarArchivoMP3Aleatorio(directorioMusica);
                        console.log(`Proceso secundario finalizado con código de salida ${code}`);
                    });
                });
            }

            function eliminarDirectorio(directorio: string) {
                if (fs.existsSync(directorio)) {
                    fs.readdirSync(directorio).forEach((archivo) => {
                        const rutaArchivo = `${directorio}/${archivo}`;

                        if (fs.lstatSync(rutaArchivo).isDirectory()) {
                            eliminarDirectorio(rutaArchivo);
                        } else {
                            fs.unlinkSync(rutaArchivo);
                        }
                    });

                    fs.rmdirSync(directorio);
                    console.log(`Directorio ${directorio} eliminado correctamente.`);
                }
            }

            function seleccionarArchivoMP3Aleatorio(directorio: string) {
                fs.readdir(directorio, (error, archivos) => {
                    if (error) {
                        console.error(`Error al leer el directorio ${directorio}:`, error);
                        return;
                    }

                    // Filtrar los archivos por extensión MP3
                    const archivosMP3 = archivos.filter((archivo) => path.extname(archivo) === '.mp3');

                    // Verificar si se encontraron archivos MP3
                    if (archivosMP3.length > 0) {
                        // Seleccionar un archivo aleatorio
                        const archivoAleatorio = archivosMP3[Math.floor(Math.random() * archivosMP3.length)];
                        const rutaArchivo = path.join(directorio, archivoAleatorio);
                        const media = MessageMedia.fromFilePath(rutaArchivo);
                        msg.react('🟢');
                        msg.reply(media, undefined, { sendAudioAsVoice: true } )
                    } else {
                        // Si no se encontraron archivos MP3, buscar en los subdirectorios
                        archivos.forEach((archivo) => {
                            const ruta = path.join(directorio, archivo);
                            fs.stat(ruta, (error, stats) => {
                                if (error) {
                                    console.error(`Error al obtener estadísticas del archivo ${ruta}:`, error);
                                    return;
                                }

                                if (stats.isDirectory()) {
                                    seleccionarArchivoMP3Aleatorio(ruta); // Llamada recursiva para buscar en subdirectorios
                                }
                            });
                        });
                    }
                });
            }


            // Uso del ejemplo
            eliminarDirectoriosMusica();
        }
    } catch (err: any) {
        msg.react('🔴');
        msg.reply('🔴 *Error. Try again.*');
    }
}