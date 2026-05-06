<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Project-Specific Rules

## PO_BRIEF.md Maintenance

**MANDATORY**: Every coding agent MUST update the `PO_BRIEF.md` file at the end of each task.

### Requirements:
- After completing any code changes, review and update the relevant sections in `PO_BRIEF.md`
- Update the **État Actuel** section with new statistics or feature status
- Add new **Points d'Amélioration** if issues are identified during development
- Update the **Feuille de Route** if timelines or priorities change
- Add entries to **Historique des Versions** for documentation changes
- Update **Notes & Décisions** if new decisions are made

### Process:
1. Complete the coding task
2. Verify all changes work correctly
3. Update `PO_BRIEF.md` with any relevant information
4. Commit the `PO_BRIEF.md` changes along with the code changes

### Example Updates:
- New feature implemented → Add to **Fonctionnalités Existantes** and update **Statut des Fonctionnalités**
- Bug fixed → Remove or update corresponding entry in **Points d'Amélioration**
- New issue identified → Add to **Points d'Amélioration Identifiés** with priority
- Decision made → Add to **Notes & Décisions**

**Note**: This ensures the PO always has accurate, up-to-date information for proposing improvements without redundancy.
