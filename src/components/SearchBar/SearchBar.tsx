import css from "./SearchBar.module.css";

interface SearchBarProp {
  onSubmit: (topic: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProp) {
  const handeleSubmit = (formData: FormData) => {
    const topic = formData.get("topic") as string;
    if (topic === "") {
      alert("Please enter search topic!");
      return;
    }
    onSubmit(topic);
  };
  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={css.form} action={handeleSubmit}>
          <input
            className={css.input}
            type="text"
            name="topic"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
