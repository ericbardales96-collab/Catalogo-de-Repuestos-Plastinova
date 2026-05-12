import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('catalogo_repuestos.db');

export const initializeDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Crear tabla de repuestos si no existe
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS repuestos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          codigo TEXT UNIQUE NOT NULL,
          descripcion_iosa TEXT NOT NULL,
          presentacion TEXT,
          tipo_compra TEXT,
          max INTEGER DEFAULT 0,
          min INTEGER DEFAULT 0,
          rack INTEGER DEFAULT 0,
          nivel INTEGER DEFAULT 0,
          modulo INTEGER DEFAULT 0,
          categoria TEXT,
          cod_rubro TEXT,
          descripcion_rubro TEXT,
          bodega TEXT,
          consumo_2022 INTEGER DEFAULT 0,
          consumo_2023 INTEGER DEFAULT 0,
          consumo_2024 INTEGER DEFAULT 0,
          consumo_2025 INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
        [],
        () => {
          console.log('Tabla de repuestos creada exitosamente');
          // Insertar datos de ejemplo
          insertSampleData(tx);
          resolve();
        },
        (error) => {
          console.error('Error al crear tabla:', error);
          reject(error);
        }
      );
    });
  });
};

const insertSampleData = (tx) => {
  const sampleData = [
    {
      codigo: '2340029',
      descripcion_iosa: 'CUCHILLA 39001435',
      presentacion: 'UNIDAD',
      tipo_compra: 'EXTRANJERO',
      max: 3500,
      min: 2000,
      rack: 1,
      nivel: 3,
      modulo: 6,
      categoria: 'REPUESTOS',
      cod_rubro: '2300',
      descripcion_rubro: 'EXTRUSION',
      bodega: 'Bodega Principal',
      consumo_2022: 5250,
      consumo_2023: 3750,
      consumo_2024: 0,
      consumo_2025: 4000,
    },
    {
      codigo: '2340065',
      descripcion_iosa: 'RESORTE DE COMPENSADOR 39801953',
      presentacion: 'UNIDAD',
      tipo_compra: 'EXTRANJERO',
      max: 2000,
      min: 1000,
      rack: 1,
      nivel: 3,
      modulo: 1,
      categoria: 'REPUESTOS',
      cod_rubro: '2400',
      descripcion_rubro: 'TELARES',
      bodega: 'Bodega Principal',
      consumo_2022: 3500,
      consumo_2023: 3500,
      consumo_2024: 4500,
      consumo_2025: 4000,
    },
    {
      codigo: '2340131',
      descripcion_iosa: 'RESORTE DE TENSION 24F-01496',
      presentacion: 'UNIDAD',
      tipo_compra: 'EXTRANJERO',
      max: 2000,
      min: 1000,
      rack: 1,
      nivel: 3,
      modulo: 1,
      categoria: 'CONSUMIBLE',
      cod_rubro: '2400',
      descripcion_rubro: 'TELARES',
      bodega: 'Bodega Principal',
      consumo_2022: 0,
      consumo_2023: 0,
      consumo_2024: 0,
      consumo_2025: 0,
    },
    {
      codigo: '2340132',
      descripcion_iosa: 'SOPORTE DE RESORTE 24F-00495',
      presentacion: 'UNIDAD',
      tipo_compra: 'EXTRANJERO',
      max: 1000,
      min: 500,
      rack: 1,
      nivel: 4,
      modulo: 2,
      categoria: 'REPUESTOS',
      cod_rubro: '2400',
      descripcion_rubro: 'TELARES',
      bodega: 'Bodega Principal',
      consumo_2022: 0,
      consumo_2023: 0,
      consumo_2024: 0,
      consumo_2025: 0,
    },
  ];

  sampleData.forEach((item) => {
    tx.executeSql(
      `INSERT OR IGNORE INTO repuestos (
        codigo, descripcion_iosa, presentacion, tipo_compra,
        max, min, rack, nivel, modulo, categoria,
        cod_rubro, descripcion_rubro, bodega,
        consumo_2022, consumo_2023, consumo_2024, consumo_2025
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        item.codigo,
        item.descripcion_iosa,
        item.presentacion,
        item.tipo_compra,
        item.max,
        item.min,
        item.rack,
        item.nivel,
        item.modulo,
        item.categoria,
        item.cod_rubro,
        item.descripcion_rubro,
        item.bodega,
        item.consumo_2022,
        item.consumo_2023,
        item.consumo_2024,
        item.consumo_2025,
      ],
      () => {
        console.log('Datos de ejemplo insertados');
      },
      (error) => {
        console.log('Error al insertar datos:', error);
      }
    );
  });
};

export const getAllRepuestos = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM repuestos ORDER BY codigo ASC;',
        [],
        (_, { rows }) => {
          const repuestos = rows._array;
          resolve(repuestos);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const searchRepuestos = async (query) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const searchTerm = `%${query}%`;
      tx.executeSql(
        `SELECT * FROM repuestos WHERE
          codigo LIKE ? OR
          descripcion_iosa LIKE ? OR
          descripcion_rubro LIKE ? OR
          categoria LIKE ?
          ORDER BY codigo ASC;`,
        [searchTerm, searchTerm, searchTerm, searchTerm],
        (_, { rows }) => {
          const results = rows._array;
          resolve(results);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const addRepuesto = async (repuesto) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO repuestos (
          codigo, descripcion_iosa, presentacion, tipo_compra,
          max, min, rack, nivel, modulo, categoria,
          cod_rubro, descripcion_rubro, bodega
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          repuesto.codigo,
          repuesto.descripcion_iosa,
          repuesto.presentacion,
          repuesto.tipo_compra,
          repuesto.max,
          repuesto.min,
          repuesto.rack,
          repuesto.nivel,
          repuesto.modulo,
          repuesto.categoria,
          repuesto.cod_rubro,
          repuesto.descripcion_rubro,
          repuesto.bodega,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const updateRepuesto = async (id, repuesto) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE repuestos SET
          descripcion_iosa = ?,
          presentacion = ?,
          tipo_compra = ?,
          max = ?,
          min = ?,
          rack = ?,
          nivel = ?,
          modulo = ?,
          categoria = ?,
          cod_rubro = ?,
          descripcion_rubro = ?,
          bodega = ?
          WHERE id = ?;`,
        [
          repuesto.descripcion_iosa,
          repuesto.presentacion,
          repuesto.tipo_compra,
          repuesto.max,
          repuesto.min,
          repuesto.rack,
          repuesto.nivel,
          repuesto.modulo,
          repuesto.categoria,
          repuesto.cod_rubro,
          repuesto.descripcion_rubro,
          repuesto.bodega,
          id,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const deleteRepuesto = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM repuestos WHERE id = ?;',
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};