import { db } from '.';

export async function getCategoryTree() {
  const nodes = await db
    .selectFrom('category')
    .selectAll()
    .orderBy('order', 'asc')
    .execute();

  // Index by ID
  // eslint-disable-next-line no-return-assign, no-sequences
  const nodeIndex = nodes.reduce((o, n) => (o[n.id] = { ...n, children: [] }, o), {});

  // Generate as a tree
  const roots = [];
  nodes.forEach(n => {
    if (!n.parent) {
      roots.push(nodeIndex[n.id]);
    } else {
      nodeIndex[n.parent].children.push(nodeIndex[n.id]);
    }
    delete nodeIndex[n.id].parent;
  });

  return roots;
}