"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
exports.getDb = getDb;
exports.closeDb = closeDb;
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const schema = __importStar(require("./schema"));
exports.schema = schema;
/**
 * Database connection factory
 * Creates and manages a singleton database connection to prevent connection leaks
 */
// Connection instance (singleton for the API server)
let connection = null;
function getConnection() {
    if (!connection) {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error("DATABASE_URL environment variable is not set");
        }
        connection = (0, postgres_1.default)(connectionString, {
            max: 10, // Maximum connections in the pool
            idle_timeout: 20, // Close idle connections after 20 seconds
            connect_timeout: 10, // Timeout for establishing connection
        });
    }
    return connection;
}
/**
 * Get the Drizzle database instance
 * Use this in the API server for all database operations
 */
function getDb() {
    return (0, postgres_js_1.drizzle)(getConnection(), { schema });
}
/**
 * Close the database connection
 * Call this on server shutdown to clean up connections
 */
async function closeDb() {
    if (connection) {
        await connection.end();
        connection = null;
    }
}
