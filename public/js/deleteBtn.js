document.querySelectorAll("#deleteBtn").forEach((button) => {
  button.addEventListener("click", async (event) => {
    try {
      const bookId = event.target.dataset.bookid;
      const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        event.target.closest(".card-container").remove();
      } else {
        throw new Error("Failed to delete book");
      }
    } catch (err) {
      console.error(err);
    }
  });
});
