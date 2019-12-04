package servlets;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ldn.lineaCanvas;
import org.jdom2.Attribute;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class guardarCanvas extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String datos = request.getParameter("datos");
        String usr = request.getParameter("usr");
        String idArchivo = request.getParameter("idArchivo");
        String nombre = request.getParameter("nombre");

        if (datos != null) {
            try {
                //Recibimos los datos Json y lo convertimos a arreglo de objetos java.
                Gson gson = new Gson();
                Type listType = new TypeToken<ArrayList<lineaCanvas>>() {
                }.getType();
                ArrayList<lineaCanvas> arrayDeJson = gson.fromJson(datos, listType);

                //Procedemos a guardar los datos en el documento xml.
                String ruta = request.getRealPath("/");
                File archivoXML = new File(ruta + "\\xml\\archivos.xml");
                Document documento = null;
                Element raiz = null;
                //Verificamos la existencia del archivo. Si no existe, lo crea desde cero.
                if (archivoXML.exists()) {
                    FileInputStream fis = new FileInputStream(archivoXML);
                    SAXBuilder builder = new SAXBuilder();
                    documento = builder.build(fis);
                    raiz = documento.getRootElement();
                    fis.close();
                } else {
                    raiz = new Element("archivos");
                    documento = new Document(raiz);
                }
                //Si el ejercicio es nuevo, se agrega un nuevo elemento al xml. Si el ejercicio es modificado,
                //se elimina el nodo existente en el xml y se sustituye con uno nuevo.
                Element archivo = new Element("archivo");
                if (idArchivo.equals("nuevo")) {
                    archivo.setAttribute(new Attribute("numero", (contarTotalEjercicios(ruta, usr) + 1) + ""));
                } else {
                    //Se recorre el xml buscando al nodo correpondiente, para posteriormente borrarlo.
                    List lista = raiz.getChildren("archivo");
                    Iterator ite = lista.iterator();
                    while (ite.hasNext()) {
                        Element elemento = (Element) ite.next();
                        String ide = elemento.getAttributeValue("usuario");
                        String num = elemento.getAttributeValue("numero");
                        if (usr.compareTo(ide) == 0 && num.compareTo(idArchivo) == 0) {
                            ite.remove();
                        }
                    }
                    archivo.setAttribute(new Attribute("numero", idArchivo));
                }

                archivo.setAttribute(new Attribute("nombre", nombre));
                archivo.setAttribute(new Attribute("usuario", usr));
                for (lineaCanvas linea : arrayDeJson) {
                    Element line = new Element("linea");
                    line.setAttribute(new Attribute("color", linea.getColor()));
                    line.setAttribute(new Attribute("x1", linea.getX1() + ""));
                    line.setAttribute(new Attribute("y1", linea.getY1() + ""));
                    line.setAttribute(new Attribute("x2", linea.getX2() + ""));
                    line.setAttribute(new Attribute("y2", linea.getY2() + ""));
                    line.setAttribute(new Attribute("lineWidth", linea.getLineWidth() + ""));
                    archivo.addContent(line);
                }

                raiz.addContent(archivo);
                documento.setContent(raiz);
                XMLOutputter xmlOutput = new XMLOutputter();
                xmlOutput.setFormat(Format.getPrettyFormat());
                xmlOutput.output(documento, new FileWriter(ruta + "\\xml\\archivos.xml"));
                response.getWriter().print("guardado");

            } catch (Exception e) {
                response.getWriter().print(e.getMessage());
            }

        }
    }

//    @Override
//    protected void doPost(HttpServletRequest request, HttpServletResponse response)
//            throws ServletException, IOException {
//
//    }

    public int contarTotalEjercicios(String ruta, String usr) {
        int regreso = 0;
        try {
            SAXBuilder builder = new SAXBuilder();
            File archivoXML = new File(ruta + "\\xml\\archivos.xml");
            Document documento = builder.build(archivoXML);
            Element raiz = documento.getRootElement();
            List lista = raiz.getChildren("archivo");

            for (int i = 0; i < lista.size(); i++) {
                Element elemento = (Element) lista.get(i);
                String ide = elemento.getAttributeValue("usuario");
                if (usr.compareTo(ide) == 0) {
                    regreso++;
                }
            }

        } catch (Exception e) {
            regreso = -1;
        }
        return regreso;
    }
}
