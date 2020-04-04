import { Storage } from "aws-amplify";

export async function s3Upload(file) {
    /* Filename below could benefit from more complexity */
    const filename = `${Date.now()}-${file.name}`;

    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type
    });

    return stored.key;
}