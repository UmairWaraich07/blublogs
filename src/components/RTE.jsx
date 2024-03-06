import { Editor } from "@tinymce/tinymce-react";
import { useId } from "react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

// eslint-disable-next-line react/prop-types
export const RTE = ({ name, label, control, defaultValue }) => {
  const id = useId();
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label htmlFor={id} className="text-dark font-semibold mb-1">
          {label} <span className="text-red-600">*</span>
        </label>
      )}

      <Controller
        name={name || ""}
        control={control}
        id={id}
        rules={{ required: true, minLength: 100 }}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.editorApiKey}
            init={{
              height: 450,
              plugins: [
                "advlist",
                "autolink",
                "link",
                "image",
                "lists",
                "charmap",
                "preview",
                "anchor",
                "pagebreak",
                "searchreplace",
                "wordcount",
                "visualblocks",
                "visualchars",
                "code",
                "codesample",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "emoticons",
                "help",
              ],
              toolbar:
                "undo redo | styles | codesample bold italic | alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | link image | preview media fullscreen | " +
                "forecolor backcolor emoticons | help",

              menubar: "favs file edit view insert format tools table help",
              content_style:
                "body { font-family:Inter, sans-serif; font-size:14px }",
            }}
            initialValue={defaultValue ? defaultValue : ""}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};
